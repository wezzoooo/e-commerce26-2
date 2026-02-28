import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground w-10 h-10 flex justify-center items-center rounded-xl font-bold text-xl transition-colors">
                            S
                        </div>
                        <span className="text-2xl font-semibold">ShopMart</span>
                    </div>

                    <p className="text-muted-foreground leading-6 transition-colors">
                        Your one-stop destination for the latest technology, fashion, and lifestyle products.
                        Quality guaranteed with fast shipping and excellent customer service.
                    </p>

                    <div className="space-y-3 text-muted-foreground transition-colors">
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>123 Shop Street, Octoper City, DC 12345</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={18} />
                            <span>(+20) 01093333333</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={18} />
                            <span>support@shopmart.com</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <span className="text-2xl font-semibold">SHOP</span>

                    <div className="space-y-3 text-muted-foreground transition-colors mt-3">
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Electronics</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Fashion</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Home & Garden</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Sports</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Deals</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <span className="text-2xl font-semibold">CUSTOMER SERVICE</span>

                    <div className="space-y-3 text-muted-foreground transition-colors mt-3">
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Contact Us</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Help Center</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Track Your Order</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Returns & Exchanges</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Size Guide</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <span className="text-2xl font-semibold">POLICIES</span>

                    <div className="space-y-3 text-muted-foreground transition-colors mt-3">
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Cookie Policy</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Shipping Policy</span>
                        <span className="block hover:text-foreground transition-colors cursor-pointer">Refund Policy</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}