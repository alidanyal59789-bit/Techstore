import { useMemo, useState } from 'react';
import { Icon } from './Icon';
import { ProductImage } from './ProductImage';
import { useOverlay } from '../hooks/useOverlay';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[11px] font-medium leading-none text-brick">{message}</p>;
}

function InputField({ label, id, required, error, ...props }) {
  return (
    <label htmlFor={id} className="block">
      <span className="label text-ink-2 mb-1.5 block">
        {label} {required && <span className="text-brick">*</span>}
        {!required && <span className="text-ink-3 normal-case tracking-normal">(Optional)</span>}
      </span>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field !rounded-xl !py-3 text-[14px] ${error ? '!border-brick focus:!border-brick !shadow-[0_0_0_3px_color-mix(in_srgb,var(--brick)_18%,transparent)]' : ''}`}
        {...props}
      />
      {error && (
        <span id={`${id}-error`}>
          <FieldError message={error} />
        </span>
      )}
    </label>
  );
}

const PAYMENT_OPTIONS = [
  {
    value: 'cod',
    title: 'Cash on Delivery',
    desc: 'Pay when your order arrives',
    icon: 'truck',
  },
  {
    value: 'upi',
    title: 'UPI',
    desc: 'GPay, PhonePe, Paytm — Demo only',
    icon: 'phone',
  },
  {
    value: 'card',
    title: 'Credit / Debit Card',
    desc: 'Visa, Mastercard, RuPay — Demo only',
    icon: 'credit-card',
  },
];

function validateForm(customerInfo, address) {
  const errors = {};
  const name = customerInfo.name.trim();
  const email = customerInfo.email.trim();
  const phone = customerInfo.phone.trim();
  const houseFlat = address.flat.trim();
  const street = address.street.trim();
  const city = address.city.trim();
  const state = address.state.trim();
  const pin = address.pin.trim();

  if (!name) errors.name = 'Full name is required';
  else if (name.length < 2) errors.name = 'Enter at least 2 characters';
  else if (!/^[a-zA-Z\s'.-]+$/.test(name)) errors.name = 'Use letters and spaces only';

  if (!email) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';

  if (!phone) errors.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(phone.replace(/\s|-/g, ''))) errors.phone = 'Enter a valid 10-digit phone number';
  else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ''))) errors.phone = 'Enter a valid Indian mobile number';

  if (!houseFlat) errors.flat = 'House / Flat number is required';
  if (!street) errors.street = 'Street / Area is required';
  if (!city) errors.city = 'City is required';
  if (!state) errors.state = 'State is required';

  if (!pin) errors.pin = 'PIN code is required';
  else if (!/^[1-9]\d{5}$/.test(pin)) errors.pin = 'Enter a valid 6-digit PIN code';

  return errors;
}

function formatDeliveryDate(iso) {
  const base = iso ? new Date(iso) : new Date();
  const delivery = new Date(base);
  delivery.setDate(base.getDate() + 5);
  return delivery.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function OrderSummaryCard({ items, subtotal, shipping, total }) {
  return (
    <div className="plate overflow-hidden">
      <div className="bg-paper-2 border-line border-b px-5 py-4">
        <h3 className="display text-ink text-[15px]">Order Summary</h3>
        <p className="label text-ink-3 mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'} · {items.reduce((a, b) => a + b.quantity, 0)} units
        </p>
      </div>

      <ul className="max-h-[38vh] overflow-y-auto px-5 lg:max-h-[42vh]">
        {items.map((item) => (
          <li key={item.id} className="border-line flex gap-3.5 border-b py-4 last:border-b-0">
            <ProductImage
              src={item.image}
              alt={`${item.brand} ${item.name}`}
              category={item.category}
              name={item.name}
              className="border-line size-16 shrink-0 rounded-xl border"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-ink truncate text-[13px] font-bold leading-tight tracking-[-0.01em]">
                {item.brand} {item.name}
              </p>
              <p className="label text-ink-3 mt-1">Qty {item.quantity} × {formatPrice(item.price)}</p>
            </div>
            <p className="font-mono text-ink shrink-0 text-[13px] font-semibold">{formatPrice(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="bg-surface-2 border-line border-t px-5 py-4">
        <dl className="space-y-2">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-2 text-[13px]">Subtotal</dt>
            <dd className="font-mono text-ink text-[13px]">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-2 text-[13px]">Shipping</dt>
            <dd className="font-mono text-[13px]">
              {shipping === 0 ? <span className="text-brand font-semibold">Free</span> : <span className="text-ink">{formatPrice(shipping)}</span>}
            </dd>
          </div>
          <div className="rule-fade my-1" />
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-display text-ink text-[15px] font-bold">Total</dt>
            <dd className="font-mono text-ink text-[18px] font-semibold tracking-[-0.02em]">{formatPrice(total)}</dd>
          </div>
        </dl>
        {subtotal < 2000 && subtotal > 0 && (
          <p className="label text-brand mt-3 bg-brand-tint rounded-full px-3 py-1 text-center">
            Add {formatPrice(2000 - subtotal)} more for free shipping
          </p>
        )}
      </div>
    </div>
  );
}

function ConfirmationView({ order, onContinue }) {
  const deliveryDate = useMemo(() => formatDeliveryDate(order?.placedAt), [order?.placedAt]);

  if (!order) return null;

  return (
    <div className="flex flex-col items-center px-6 py-8 text-center sm:px-10 sm:py-10">
      <span className="bg-brand text-brand-ink grid size-16 place-items-center rounded-2xl shadow-[var(--shadow-glow)]">
        <Icon name="check" size={28} strokeWidth={2.6} />
      </span>

      <h2 className="display text-ink mt-6 text-[22px] sm:text-[26px]">Order Placed Successfully!</h2>
      <p className="text-ink-2 mt-3 max-w-md text-[15px] leading-relaxed">
        Thank you, <span className="text-ink font-semibold">{order.customerName}</span>! Your order has been confirmed and is being prepared for shipment.
      </p>

      <div className="plate mt-6 w-full max-w-md space-y-3 p-5 text-left sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-ink-3">Order ID</span>
          <span className="font-mono text-ink text-[12px] font-semibold tracking-wide">{order.reference}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-ink-3">Total Paid</span>
          <span className="font-mono text-ink text-[14px] font-semibold">{formatPrice(order.total)}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="label text-ink-3">Payment</span>
          <span className="text-ink text-[13px] font-medium capitalize">
            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'upi' ? 'UPI (Demo)' : 'Card (Demo)'}
          </span>
        </div>
        <div className="rule-fade my-2" />
        <div className="bg-brand-tint/60 rounded-xl px-4 py-3">
          <p className="label text-brand mb-1 flex items-center gap-1.5">
            <Icon name="truck" size={14} /> Estimated Delivery
          </p>
          <p className="text-ink text-[13px] font-medium leading-relaxed">{deliveryDate}</p>
          <p className="text-ink-2 mt-1 text-[12px]">You’ll receive a confirmation email at {order.customerEmail}</p>
        </div>

        <div className="border-line mt-3 rounded-xl border bg-surface-2 px-4 py-3">
          <p className="label text-ink-3 mb-2">Shipping to</p>
          <p className="text-ink text-[13px] leading-relaxed">
            {order.address.flat}, {order.address.street}
            <br />
            {order.address.city}, {order.address.state} — {order.address.pin}
            {order.address.landmark ? ` · Near ${order.address.landmark}` : ''}
          </p>
        </div>

        <ul className="border-line mt-2 divide-y divide-[var(--line)] rounded-xl border">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-3 py-2.5">
              <img src={item.image} alt={item.name} className="border-line size-10 rounded-lg border object-cover" />
              <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-medium">{item.name}</span>
              <span className="label text-ink-3">×{item.quantity}</span>
              <span className="font-mono text-ink text-[11px] font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="label text-ink-3 mt-4 max-w-md leading-relaxed">
        Demo order · No payment was processed. This information is saved locally for your reference.
      </p>

      <button type="button" onClick={onContinue} className="btn btn-primary mt-6 w-full max-w-md py-3.5 text-[14px]">
        Continue Shopping
        <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}

export function Checkout() {
  const {
    items,
    subtotal,
    shipping,
    total,
    checkoutOpen,
    checkoutStep,
    closeCheckout,
    resetCheckout,
    customerInfo,
    address,
    paymentMethod,
    orderResult,
    updateCustomerInfo,
    updateAddress,
    setPaymentMethod,
    placeOrder,
  } = useCart();

  const panelRef = useOverlay(checkoutOpen, closeCheckout);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!checkoutOpen) return null;

  const isConfirmation = checkoutStep === 'confirmation' && orderResult;

  const handleContinueShopping = () => {
    resetCheckout();
    // Scroll to products after modal closes
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePlaceOrder = () => {
    const nextErrors = validateForm(customerInfo, address);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      flat: true,
      street: true,
      city: true,
      state: true,
      pin: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      // Focus first invalid field
      const first = Object.keys(nextErrors)[0];
      const map = {
        name: 'checkout-name',
        email: 'checkout-email',
        phone: 'checkout-phone',
        flat: 'checkout-flat',
        street: 'checkout-street',
        city: 'checkout-city',
        state: 'checkout-state',
        pin: 'checkout-pin',
      };
      const id = map[first];
      if (id) setTimeout(() => document.getElementById(id)?.focus(), 50);
      return;
    }

    placeOrder();
  };

  const markTouched = (field) => setTouched((p) => ({ ...p, [field]: true }));

  // Only show error if field has been touched or form submitted
  const showErr = (field) => touched[field] && errors[field];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[hsl(var(--shadow-color)/0.38)] p-0 sm:items-center sm:p-4 sm:backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="anim-fade absolute inset-0 bg-[hsl(var(--shadow-color)/0.45)] backdrop-blur-sm" onClick={closeCheckout} aria-hidden="true" />

      <div
        ref={panelRef}
        tabIndex={-1}
        className={`anim-sheet bg-paper relative flex max-h-[100svh] w-full max-w-[1020px] flex-col overflow-hidden border sm:max-h-[92svh] sm:rounded-3xl sm:border ${isConfirmation ? 'max-w-[640px]' : ''}`}
        style={{ boxShadow: 'var(--shadow-float)' }}
      >
        {/* Header */}
        <header className="border-line bg-surface sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <h2 id="checkout-title" className="display text-ink text-[17px] sm:text-[19px]">
              {isConfirmation ? 'Order Confirmation' : 'Checkout'}
            </h2>
            {!isConfirmation && (
              <p className="label text-ink-3 mt-1 hidden sm:block">
                {items.length} {items.length === 1 ? 'item' : 'items'} · Secure checkout · Demo only
              </p>
            )}
            {!isConfirmation && (
              <p className="label text-ink-3 mt-1 sm:hidden">
                {items.length} {items.length === 1 ? 'item' : 'items'} · Demo checkout
              </p>
            )}
          </div>
          <button type="button" onClick={closeCheckout} aria-label="Close checkout" className="btn-icon size-9 shrink-0">
            <Icon name="close" size={17} />
          </button>
        </header>

        {isConfirmation ? (
          <div className="overflow-y-auto">
            <ConfirmationView order={orderResult} onContinue={handleContinueShopping} />
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="border-line bg-surface-2 border-b px-5 py-3 sm:px-7">
              <div className="flex items-center gap-2 text-[11px] font-medium">
                <span className="bg-brand text-brand-ink grid size-6 place-items-center rounded-full font-mono text-[11px]">1</span>
                <span className="text-ink">Details</span>
                <span className="bg-line-2 h-px flex-1" />
                <span className="bg-brand-tint text-brand grid size-6 place-items-center rounded-full font-mono text-[11px]">2</span>
                <span className="text-ink-2">Summary</span>
                <span className="bg-line-2 h-px flex-1" />
                <span className="bg-brand text-brand-ink grid size-6 place-items-center rounded-full">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
                <span className="text-ink-2 hidden sm:inline">Confirmation</span>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.15fr_0.85fr]">
              {/* Left: Forms */}
              <div className="space-y-6 px-5 py-6 sm:px-7">
                {/* Customer Information */}
                <section className="plate p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="bg-brand-tint text-brand grid size-8 place-items-center rounded-full">
                      <Icon name="user" size={15} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-display text-ink text-[14px] font-bold">Customer Information</h3>
                      <p className="label text-ink-3">We’ll use this to confirm your order</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <InputField
                      label="Full Name"
                      id="checkout-name"
                      required
                      type="text"
                      placeholder="Aarav Sharma"
                      autoComplete="name"
                      value={customerInfo.name}
                      onChange={(e) => updateCustomerInfo({ name: e.target.value })}
                      onBlur={() => {
                        markTouched('name');
                        setErrors(validateForm({ ...customerInfo, name: customerInfo.name }, address));
                      }}
                      error={showErr('name') ? errors.name : undefined}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="Email Address"
                        id="checkout-email"
                        required
                        type="email"
                        placeholder="aarav@example.com"
                        autoComplete="email"
                        value={customerInfo.email}
                        onChange={(e) => updateCustomerInfo({ email: e.target.value })}
                        onBlur={() => {
                          markTouched('email');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('email') ? errors.email : undefined}
                      />
                      <InputField
                        label="Phone Number"
                        id="checkout-phone"
                        required
                        type="tel"
                        inputMode="numeric"
                        placeholder="98XXXXXXXX"
                        autoComplete="tel"
                        value={customerInfo.phone}
                        onChange={(e) => updateCustomerInfo({ phone: e.target.value.replace(/[^0-9\s-]/g, '') })}
                        onBlur={() => {
                          markTouched('phone');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('phone') ? errors.phone : undefined}
                      />
                    </div>
                  </div>
                </section>

                {/* Delivery Address */}
                <section className="plate p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="bg-brand-tint text-brand grid size-8 place-items-center rounded-full">
                      <Icon name="map-pin" size={15} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-display text-ink text-[14px] font-bold">Delivery Address</h3>
                      <p className="label text-ink-3">Where should we deliver your order?</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="House / Flat Number"
                        id="checkout-flat"
                        required
                        type="text"
                        placeholder="B-204, Green Valley"
                        autoComplete="address-line1"
                        value={address.flat}
                        onChange={(e) => updateAddress({ flat: e.target.value })}
                        onBlur={() => {
                          markTouched('flat');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('flat') ? errors.flat : undefined}
                      />
                      <InputField
                        label="PIN Code"
                        id="checkout-pin"
                        required
                        type="text"
                        inputMode="numeric"
                        placeholder="110001"
                        autoComplete="postal-code"
                        value={address.pin}
                        onChange={(e) => updateAddress({ pin: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        onBlur={() => {
                          markTouched('pin');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('pin') ? errors.pin : undefined}
                      />
                    </div>

                    <InputField
                      label="Street / Area"
                      id="checkout-street"
                      required
                      type="text"
                      placeholder="MG Road, Near City Mall"
                      autoComplete="street-address"
                      value={address.street}
                      onChange={(e) => updateAddress({ street: e.target.value })}
                      onBlur={() => {
                        markTouched('street');
                        setErrors(validateForm(customerInfo, address));
                      }}
                      error={showErr('street') ? errors.street : undefined}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="City"
                        id="checkout-city"
                        required
                        type="text"
                        placeholder="Bengaluru"
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={(e) => updateAddress({ city: e.target.value })}
                        onBlur={() => {
                          markTouched('city');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('city') ? errors.city : undefined}
                      />
                      <InputField
                        label="State"
                        id="checkout-state"
                        required
                        type="text"
                        placeholder="Karnataka"
                        autoComplete="address-level1"
                        value={address.state}
                        onChange={(e) => updateAddress({ state: e.target.value })}
                        onBlur={() => {
                          markTouched('state');
                          setErrors(validateForm(customerInfo, address));
                        }}
                        error={showErr('state') ? errors.state : undefined}
                      />
                    </div>

                    <InputField
                      label="Landmark"
                      id="checkout-landmark"
                      type="text"
                      placeholder="Opp. Central Park (if any)"
                      value={address.landmark}
                      onChange={(e) => updateAddress({ landmark: e.target.value })}
                    />
                  </div>
                </section>

                {/* Payment Method */}
                <section className="plate p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="bg-brand-tint text-brand grid size-8 place-items-center rounded-full">
                      <Icon name="credit-card" size={15} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-display text-ink text-[14px] font-bold">Payment Method</h3>
                      <p className="label text-ink-3">Choose how you’d like to pay</p>
                    </div>
                  </div>

                  <div className="grid gap-2.5" role="radiogroup" aria-label="Payment method">
                    {PAYMENT_OPTIONS.map((opt) => {
                      const selected = paymentMethod === opt.value;
                      const isDemo = opt.value !== 'cod';
                      return (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition-[border-color,background-color,box-shadow] ${
                            selected ? 'border-brand bg-brand-tint shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_12%,transparent)]' : 'border-line bg-surface hover:border-line-2'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={selected}
                            onChange={() => setPaymentMethod(opt.value)}
                            className="sr-only"
                          />
                          <span className={`grid size-9 place-items-center rounded-full border ${selected ? 'bg-brand text-brand-ink border-brand' : 'bg-surface-2 text-ink-2 border-line'}`}>
                            <Icon name={opt.icon} size={16} strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="text-ink text-[13px] font-semibold">{opt.title}</span>
                              {isDemo && <span className="label bg-amber/15 text-amber rounded-full px-2 py-0.5 text-[9px]">Demo</span>}
                            </span>
                            <span className="text-ink-2 block text-[12px]">{opt.desc}</span>
                          </span>
                          <span className={`grid size-5 place-items-center rounded-full border-2 ${selected ? 'border-brand bg-brand' : 'border-line-2 bg-surface'}`}>
                            {selected && <span className="bg-brand-ink size-1.5 rounded-full" />}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="bg-amber/10 border-amber/20 mt-4 flex gap-2.5 rounded-xl border px-3.5 py-3">
                    <Icon name="shieldCheck" size={16} className="text-amber mt-0.5 shrink-0" strokeWidth={1.7} />
                    <p className="text-ink-2 text-[12px] leading-relaxed">
                      <span className="text-ink font-semibold">Demo checkout:</span> Online payments (UPI / Card) are for demonstration purposes only. No real payment will be processed and no money will be charged.
                    </p>
                  </div>
                </section>

                {/* Mobile order summary + place order */}
                <div className="lg:hidden">
                  <OrderSummaryCard items={items} subtotal={subtotal} shipping={shipping} total={total} />
                  <button type="button" onClick={handlePlaceOrder} className="btn btn-primary mt-4 w-full py-4 text-[15px]">
                    Place Order — {formatPrice(total)}
                    <Icon name="lock" size={15} strokeWidth={1.8} />
                  </button>
                  <p className="label text-ink-3 mt-3 text-center leading-relaxed">By placing your order, you agree to our Terms and Privacy Policy</p>
                </div>

                {/* Desktop place order button (left column) */}
                <div className="hidden lg:block">
                  <button type="button" onClick={handlePlaceOrder} className="btn btn-primary w-full py-4 text-[15px]">
                    Place Order — {formatPrice(total)}
                    <Icon name="lock" size={15} strokeWidth={1.8} />
                  </button>
                  <p className="label text-ink-3 mt-3 text-center leading-relaxed">By placing your order, you agree to our Terms and Privacy Policy</p>
                </div>
              </div>

              {/* Right: Sticky summary on desktop */}
              <div className="hidden border-l border-line bg-paper-2/50 px-5 py-6 lg:block lg:overflow-y-auto">
                <div className="sticky top-0">
                  <OrderSummaryCard items={items} subtotal={subtotal} shipping={shipping} total={total} />
                  <div className="border-line bg-surface mt-4 flex gap-2.5 rounded-2xl border px-4 py-3">
                    <Icon name="shieldCheck" size={16} className="text-brand mt-0.5 shrink-0" />
                    <div>
                      <p className="text-ink text-[12px] font-semibold">Secure & trusted checkout</p>
                      <p className="text-ink-2 text-[11px] leading-relaxed">Your information is safe. Encrypted and never shared.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
