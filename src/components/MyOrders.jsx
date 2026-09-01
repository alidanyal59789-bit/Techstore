import { Icon } from './Icon';
import { ProductImage } from './ProductImage';
import { SectionHead } from './SectionHead';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { formatPrice } from '../lib/format';

function formatOrderDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}

function AddressLine({ address }) {
  if (!address) return null;
  const parts = [
    address.flat,
    address.street,
    address.landmark ? `Near ${address.landmark}` : null,
    `${address.city}, ${address.state} — ${address.pin}`,
  ].filter(Boolean);
  return <span>{parts.join(', ')}</span>;
}

function OrderCard({ order, index }) {
  const totalUnits = order.items?.reduce((a, b) => a + b.quantity, 0) ?? 0;

  return (
    <article
      className="plate reveal overflow-hidden"
      style={{ '--d': `${Math.min(index * 70, 300)}ms` }}
    >
      {/* Header */}
      <div className="bg-paper-2 border-line flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-brand text-brand-ink grid size-7 place-items-center rounded-full">
              <Icon name="receipt" size={14} />
            </span>
            <span className="font-mono text-ink text-[12px] font-semibold tracking-wide">{order.reference}</span>
            <span
              className={`label rounded-full px-2.5 py-1 text-[9px] ${
                order.status === 'Confirmed'
                  ? 'bg-brand text-brand-ink'
                  : 'bg-brand-tint text-brand'
              }`}
            >
              {order.status || 'Confirmed'}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="label text-ink-3 flex items-center gap-1.5">
              <Icon name="refresh" size={12} className="opacity-70" />
              {formatOrderDate(order.placedAt)}
            </span>
            <span className="label text-ink-3">
              {order.items?.length ?? 0} {order.items?.length === 1 ? 'product' : 'products'} · {totalUnits} {totalUnits === 1 ? 'unit' : 'units'}
            </span>
          </div>
          <div className="text-ink-2 text-[12px] leading-relaxed">
            <span className="font-medium text-ink">{order.customerName}</span>
            {order.customerPhone ? <span className="text-ink-3"> · {order.customerPhone}</span> : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
          <span className="label text-ink-3">Total Amount</span>
          <span className="font-mono text-ink text-[18px] font-semibold tracking-[-0.02em]">{formatPrice(order.total)}</span>
          {order.shipping === 0 ? (
            <span className="label text-brand bg-brand-tint rounded-full px-2 py-0.5">Free Shipping</span>
          ) : (
            <span className="label text-ink-3">Incl. {formatPrice(order.shipping)} shipping</span>
          )}
        </div>
      </div>

      {/* Products */}
      <ul className="divide-line divide-y px-5 sm:px-6">
        {order.items?.map((item) => (
          <li key={`${order.reference}-${item.id}`} className="flex gap-3.5 py-4">
            <ProductImage
              src={item.image}
              alt={item.name}
              category={item.category}
              name={item.name}
              className="border-line size-16 shrink-0 rounded-xl border sm:size-20"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-ink truncate text-[13px] font-bold leading-tight tracking-[-0.01em] sm:text-[14px]">
                {item.name}
              </p>
              {item.category && <p className="label text-ink-3 mt-1">{item.category}</p>}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="border-line bg-surface-2 text-ink rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium">
                  Qty {item.quantity}
                </span>
                <span className="font-mono text-ink-2 text-[11px]">
                  {formatPrice(item.price)} each
                </span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-center gap-1">
              <span className="font-mono text-ink text-[13px] font-semibold sm:text-[14px]">
                {formatPrice(item.price * item.quantity)}
              </span>
              <span className="label text-ink-3 hidden sm:inline">
                {item.quantity} × {formatPrice(item.price)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Address & Payment */}
      <div className="bg-surface-2 border-line border-t px-5 py-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <p className="label text-ink-3 flex items-center gap-1.5">
              <Icon name="map-pin" size={12} /> Delivery Address
            </p>
            <p className="text-ink text-[13px] leading-relaxed">
              <AddressLine address={order.address} />
            </p>
            {order.customerPhone && (
              <p className="text-ink-2 flex items-center gap-1.5 text-[12px]">
                <Icon name="phone" size={12} className="shrink-0" />
                {order.customerPhone}
              </p>
            )}
          </div>
          <div className="space-y-1.5 sm:text-right">
            <p className="label text-ink-3 flex items-center gap-1.5 sm:justify-end">
              <Icon name="credit-card" size={12} /> Payment
            </p>
            <p className="text-ink text-[13px] font-medium capitalize">
              {order.paymentMethod === 'cod'
                ? 'Cash on Delivery'
                : order.paymentMethod === 'upi'
                  ? 'UPI (Demo)'
                  : order.paymentMethod === 'card'
                    ? 'Credit / Debit Card (Demo)'
                    : order.paymentMethod}
            </p>
            <p className="label text-ink-3 leading-relaxed sm:ml-auto sm:max-w-[28ch]">
              Demo order · No payment was processed
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="plate reveal flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16">
      <span className="bg-surface-2 text-ink-3 border-line grid size-16 place-items-center rounded-2xl border">
        <Icon name="package" size={28} strokeWidth={1.4} />
      </span>
      <h3 className="display text-ink mt-6 text-[19px] sm:text-[22px]">No orders yet</h3>
      <p className="text-ink-2 mt-3 max-w-md text-[14px] leading-relaxed sm:text-[15px]">
        No orders yet. Start shopping to place your first order.
      </p>
      <p className="text-ink-3 mt-2 max-w-md text-[13px] leading-relaxed">
        Your orders will appear here with full details and delivery status after checkout.
      </p>
      <button type="button" onClick={scrollToProducts} className="btn btn-primary mt-7 px-7 py-3">
        Browse Products
        <Icon name="arrowRight" size={16} />
      </button>
      <p className="label text-ink-3 mt-4">Secure checkout · Free shipping over ₹2,000</p>
    </div>
  );
}

export function MyOrders() {
  const { orderHistory } = useCart();

  const orders = (orderHistory ?? []).slice().sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));

  useScrollReveal([orders.length]);

  return (
    <section id="orders" className="scroll-mt-20 pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Orders"
          title="My Orders"
          lede={
            orders.length
              ? `You have ${orders.length} ${orders.length === 1 ? 'order' : 'orders'} — newest first. All orders are saved locally and include full delivery and payment details.`
              : "Track every order you've placed. New orders appear here instantly after checkout — nothing is lost, even after you refresh."
          }
        />

        <div className="mt-10">
          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-5">
              {orders.map((order, idx) => (
                <OrderCard key={order.reference} order={order} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
