import { Mail, MapPin, Phone } from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-white border-t py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white w-10 h-10 flex justify-center items-center rounded-xl font-bold text-xl">
                            S
                        </div>
                        <span className="text-2xl font-semibold">ShopMart</span>
                    </div>

                    <p className="text-gray-600 leading-6">
                        Your one-stop destination for the latest technology, fashion, and lifestyle products.
                        Quality guaranteed with fast shipping and excellent customer service.
                    </p>

                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin size={18}/>
                            <span>123 Shop Street, Octoper City, DC 12345</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={18}/>
                            <span>(+20) 01093333333</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={18}/>
                            <span>support@shopmart.com</span>
                        </div>
                    </div>

                </div>

                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        
                        <span className="text-2xl font-semibold">SHOP</span>
                    </div>

                    

                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>Electronics</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Fashion</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Home & Garden</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Sports</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Deals</span>
                        </div>
                    </div>

                </div>


                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        
                        <span className="text-2xl font-semibold">CUSTOMER SERVICE</span>
                    </div>

                    

                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>Contact Us</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Help Center</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Track Your Order</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Returns & Exchanges</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Size Guide</span>
                        </div>
                    </div>

                </div>


                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        
                        <span className="text-2xl font-semibold">POLICIES</span>
                    </div>

                    

                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>Privacy Policy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Terms of Service</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Cookie Policy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Shipping Policy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Refund Policy</span>
                        </div>
                    </div>

                </div>

                

            </div>
        </footer>
    )
}
