import { getUserOrders } from '@/app/_actions/checkout.action'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import OrderItemsHoverDialog from '@/components/orders/orderItemsHoverDialog'


export default async function AllOrders() {

  const session = await getServerSession(authOptions)

  if (!session?.token) {
    return <div className="text-center mt-20 text-xl">You must be logged in</div>
  }

  const data = await getUserOrders()
  const orders = data?.orders || data

  

  if (!orders?.length) {
    return <div className="text-center mt-20 text-xl">No orders yet</div>
  }

  return (
    <main>
      <div className="max-w-5xl mx-auto p-10 space-y-6">
        <h1 className="text-3xl font-bold">My Orders</h1>

        {orders.map((order: any) => (
          <Card key={order._id}>
            <CardHeader>
              <CardTitle>Order #{order._id}</CardTitle>
              <CardDescription>
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <p><strong>Payment Method:</strong> {order.paymentMethodType}</p>
              <p><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>
              <p>
                <strong>Status:</strong>{" "}
                {order.isPaid ? "Paid" : "Not Paid"}
              </p>
              <p>
                <strong>Shipping:</strong>{" "}
                {order.shippingAddress?.details}, {order.shippingAddress?.city}
              </p>
            </CardContent>

            <CardFooter className='flex items-center justify-between'>
              <p className="text-sm text-muted-foreground">
                Items: {order.cartItems?.length || 0}
              </p>
              <div className="flex items-center gap-3">
                <OrderItemsHoverDialog items={order.cartItems || []} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}