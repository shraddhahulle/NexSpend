
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductDetailProps {
  id: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  link: string;
  description: string;
}

const ProductDetail = ({ id }: ProductDetailProps) => {
  // Product data based on ID
  const getProductData = (productId: string): ProductItem[] => {
    switch (productId) {
      case 'amazon':
        return [
          {
            id: '1',
            name: 'Apple AirPods Pro (2nd Generation)',
            price: '$189.99',
            originalPrice: '$249.00',
            discount: '24% off',
            image: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
            link: 'https://www.amazon.com',
            description: 'Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C Charging'
          },
          {
            id: '2',
            name: 'Amazon Echo Dot (5th Gen)',
            price: '$34.99',
            originalPrice: '$49.99',
            discount: '30% off',
            image: 'https://m.media-amazon.com/images/I/71K5reDt9cL._AC_SL1000_.jpg',
            link: 'https://www.amazon.com',
            description: 'Echo Dot (5th Gen, 2022 release) | Smart speaker with Alexa'
          },
          {
            id: '3',
            name: 'Smart Watch Fitness Tracker',
            price: '$49.99',
            originalPrice: '$89.99',
            discount: '44% off',
            image: 'https://m.media-amazon.com/images/I/71RbTOi-IsL._AC_SL1500_.jpg',
            link: 'https://www.amazon.com',
            description: 'Smart Watch with Heart Rate Sleep Monitor, 1.69" Touch Screen'
          }
        ];
      case 'zomato':
        return [
          {
            id: '1',
            name: 'Family Meal Deal',
            price: '$29.99',
            originalPrice: '$45.00',
            discount: '33% off',
            image: 'https://b.zmtcdn.com/data/pictures/chains/0/19955190/f0f57e196f8f2dc810568ac42543cf3f.jpg',
            link: 'https://www.zomato.com',
            description: 'Family meal with 2 large pizzas, garlic bread, and drinks'
          },
          {
            id: '2',
            name: 'Sushi Platter',
            price: '$24.99',
            originalPrice: '$32.99',
            discount: '24% off',
            image: 'https://b.zmtcdn.com/data/pictures/chains/3/308723/2d05be630a6b1d9c92799747a4946b3e.jpg',
            link: 'https://www.zomato.com',
            description: '24-piece sushi platter with variety of rolls'
          }
        ];
      case 'netflix':
        return [
          {
            id: '1',
            name: 'Standard Plan',
            price: '$15.49/month',
            image: 'https://assets.nflxext.com/ffe/siteui/acquisition/home/thisIsNetflix/modules/asset_watchontv_webkit.png',
            link: 'https://www.netflix.com',
            description: 'Watch on 2 screens at once in Full HD'
          },
          {
            id: '2',
            name: 'Premium Plan',
            price: '$22.99/month',
            image: 'https://assets.nflxext.com/ffe/siteui/acquisition/home/thisIsNetflix/modules/asset_premium_webkit.png',
            link: 'https://www.netflix.com',
            description: 'Watch on 4 screens at once in Ultra HD'
          }
        ];
      case 'gaming':
        return [
          {
            id: '1',
            name: 'PlayStation 5 Digital Edition',
            price: '$399.99',
            originalPrice: '$449.99',
            discount: '11% off',
            image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
            link: 'https://www.playstation.com',
            description: 'PlayStation 5 Digital Edition Console'
          },
          {
            id: '2',
            name: 'Xbox Game Pass Ultimate',
            price: '$17.99/month',
            originalPrice: '$24.99/month',
            discount: '28% off',
            image: 'https://assets.xboxservices.com/assets/3b/1a/3b1a90a5-0ebb-475e-b35c-35a34cff0a13.jpg',
            link: 'https://www.xbox.com',
            description: '3 Month Xbox Game Pass Ultimate Membership'
          }
        ];
      case 'travel':
        return [
          {
            id: '1',
            name: 'Caribbean Cruise',
            price: '$599',
            originalPrice: '$899',
            discount: '33% off',
            image: 'https://www.royalcaribbean.com/content/royal/US/hero-mobile.jpg',
            link: 'https://www.expedia.com',
            description: '7-Night Caribbean Cruise - All Inclusive'
          },
          {
            id: '2',
            name: 'Flight to Hawaii',
            price: '$349',
            originalPrice: '$499',
            discount: '30% off',
            image: 'https://www.gohawaii.com/sites/default/files/styles/image_gallery_bg_xl/public/hero-unit-images/10646_mauiaerial.jpg',
            link: 'https://www.expedia.com',
            description: 'Round-trip flights to Hawaii'
          }
        ];
      case 'coffee':
        return [
          {
            id: '1',
            name: 'Premium Coffee Subscription',
            price: '$14.99/month',
            originalPrice: '$19.99/month',
            discount: '25% off',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
            link: 'https://www.starbucks.com',
            description: 'Premium coffee beans delivered monthly'
          },
          {
            id: '2',
            name: 'Coffee Machine Deluxe',
            price: '$89.99',
            originalPrice: '$129.99',
            discount: '30% off',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
            link: 'https://www.starbucks.com',
            description: 'Automatic coffee machine with milk frother'
          }
        ];
      case 'groceries':
        return [
          {
            id: '1',
            name: 'Organic Food Box',
            price: '$49.99',
            originalPrice: '$65.99',
            discount: '24% off',
            image: 'https://images.unsplash.com/photo-1543168256-418811576931',
            link: 'https://www.wholefoodsmarket.com',
            description: 'Weekly box of fresh organic vegetables and fruits'
          },
          {
            id: '2',
            name: 'Pantry Essentials Bundle',
            price: '$29.99',
            originalPrice: '$42.99',
            discount: '30% off',
            image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818',
            link: 'https://www.wholefoodsmarket.com',
            description: 'Bundle of essential pantry items'
          }
        ];
      case 'fashion':
        return [
          {
            id: '1',
            name: 'Designer Handbag',
            price: '$159.99',
            originalPrice: '$249.99',
            discount: '36% off',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
            link: 'https://www.nordstrom.com',
            description: 'Genuine leather designer handbag'
          },
          {
            id: '2',
            name: 'Premium Sneakers',
            price: '$89.99',
            originalPrice: '$129.99',
            discount: '30% off',
            image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3',
            link: 'https://www.nordstrom.com',
            description: 'Premium athletic sneakers'
          }
        ];
      case 'electronics':
        return [
          {
            id: '1',
            name: 'Ultra HD Smart TV',
            price: '$499.99',
            originalPrice: '$699.99',
            discount: '28% off',
            image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575',
            link: 'https://www.bestbuy.com',
            description: '55" Ultra HD Smart TV with voice control'
          },
          {
            id: '2',
            name: 'Wireless Noise-Cancelling Headphones',
            price: '$199.99',
            originalPrice: '$299.99',
            discount: '33% off',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
            link: 'https://www.bestbuy.com',
            description: 'Premium wireless noise-cancelling headphones'
          }
        ];
      default:
        return [];
    }
  };

  const productData = getProductData(id);
  
  // Format product name for display
  const getProductName = (productId: string) => {
    const names: Record<string, string> = {
      'amazon': 'Amazon',
      'zomato': 'Zomato',
      'netflix': 'Netflix',
      'gaming': 'Gaming',
      'travel': 'Travel',
      'coffee': 'Coffee',
      'groceries': 'Groceries',
      'fashion': 'Fashion',
      'electronics': 'Electronics'
    };
    return names[productId] || 'Product';
  };

  return (
    <div className="space-y-6 pb-16 bg-white text-black">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black">{getProductName(id)} Deals</h1>
        <p className="text-gray-600">Exclusive offers for NexSpend users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productData.map((item) => (
          <Card key={item.id} className="overflow-hidden border bg-[#f5f5dc]">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-xl text-black">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-black">{item.price}</span>
                {item.originalPrice && (
                  <span className="text-sm line-through text-gray-500">{item.originalPrice}</span>
                )}
                {item.discount && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{item.discount}</span>
                )}
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => window.open(item.link, '_blank')}
              >
                View Deal <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
