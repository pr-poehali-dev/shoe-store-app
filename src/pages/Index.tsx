import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UserRole = 'guest' | 'client' | 'manager' | 'admin';

interface User {
  login: string;
  password: string;
  role: UserRole;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  priceWithDiscount?: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  stock: number;
  discount: number;
  supplier: string;
}

interface Order {
  id: number;
  productName: string;
  size: number;
  quantity: number;
  total: number;
  status: string;
  date: string;
}

interface PickupPoint {
  id: number;
  name: string;
  address: string;
  hours: string;
}

const MOCK_USERS: User[] = [
  { login: 'client', password: '123', role: 'client', name: 'Анна Иванова' },
  { login: 'manager', password: '123', role: 'manager', name: 'Сергей Петров' },
  { login: 'admin', password: '123', role: 'admin', name: 'Мария Сидорова' },
];

const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'А112Т4', 
    name: 'Ботинки', 
    price: 4990, 
    priceWithDiscount: 4840, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Женская обувь', 
    brand: 'Kari',
    description: 'Женские Ботинки демисезонные kari',
    stock: 6,
    discount: 3,
    supplier: 'Kari'
  },
  { 
    id: 'F635R4', 
    name: 'Ботинки', 
    price: 3244, 
    priceWithDiscount: 3179, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Женская обувь', 
    brand: 'Marco Tozzi',
    description: 'Ботинки Marco Tozzi женские демисезонные, размер 39, цвет бежевый',
    stock: 13,
    discount: 2,
    supplier: 'Обувь для вас'
  },
  { 
    id: 'H782T5', 
    name: 'Туфли', 
    price: 4499, 
    priceWithDiscount: 4319, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Мужская обувь', 
    brand: 'Kari',
    description: 'Туфли kari мужские классика MYZ21AW-450A, размер 43, цвет: черный',
    stock: 5,
    discount: 4,
    supplier: 'Kari'
  },
  { 
    id: 'G783F5', 
    name: 'Ботинки', 
    price: 5900, 
    priceWithDiscount: 5782, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Мужская обувь', 
    brand: 'Рос',
    description: 'Мужские ботинки Рос-Обувь кожаные с натуральным мехом',
    stock: 8,
    discount: 2,
    supplier: 'Kari'
  },
  { 
    id: 'J384T6', 
    name: 'Ботинки', 
    price: 3800, 
    priceWithDiscount: 3724, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Мужская обувь', 
    brand: 'Rieker',
    description: 'B3430/14 Полуботинки мужские Rieker',
    stock: 16,
    discount: 2,
    supplier: 'Обувь для вас'
  },
  { 
    id: 'D572U8', 
    name: 'Кроссовки', 
    price: 4100, 
    priceWithDiscount: 3977, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Мужская обувь', 
    brand: 'Рос',
    description: '129615-4 Кроссовки мужские',
    stock: 6,
    discount: 3,
    supplier: 'Обувь для вас'
  },
  { 
    id: 'F572H7', 
    name: 'Туфли', 
    price: 2700, 
    priceWithDiscount: 2646, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Женская обувь', 
    brand: 'Marco Tozzi',
    description: 'Туфли Marco Tozzi женские летние, размер 39, цвет черный',
    stock: 14,
    discount: 2,
    supplier: 'Kari'
  },
  { 
    id: 'D329H3', 
    name: 'Полуботинки', 
    price: 1890, 
    priceWithDiscount: 1814, 
    image: 'https://cdn.poehali.dev/files/image.png', 
    category: 'Женская обувь', 
    brand: 'Alessio Nesca',
    description: 'Полуботинки Alessio Nesca женские 3-30797-47, размер 37, цвет: бордовый',
    stock: 4,
    discount: 4,
    supplier: 'Обувь для вас'
  },
];

const MOCK_ORDERS: Order[] = [
  { id: 1, productName: 'Кроссовки Nike Air Max', size: 42, quantity: 1, total: 8999, status: 'В обработке', date: '2024-12-20' },
  { id: 2, productName: 'Туфли классические', size: 39, quantity: 2, total: 10998, status: 'Доставлен', date: '2024-12-18' },
];

const PICKUP_POINTS: PickupPoint[] = [
  { id: 1, name: 'Пункт выдачи №1', address: 'ул. Ленина, д. 45', hours: '9:00 - 21:00' },
  { id: 2, name: 'Пункт выдачи №2', address: 'пр. Мира, д. 12', hours: '10:00 - 20:00' },
  { id: 3, name: 'Пункт выдачи №3', address: 'ул. Пушкина, д. 78', hours: '8:00 - 22:00' },
];

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'pickup'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleLogin = () => {
    const user = MOCK_USERS.find(u => u.login === loginInput && u.password === passwordInput);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      toast.success(`Добро пожаловать, ${user.name}!`);
    } else {
      toast.error('Неверный логин или пароль');
    }
  };

  const handleGuestLogin = () => {
    setCurrentUser({ login: 'guest', password: '', role: 'guest', name: 'Гость' });
    setIsLoggedIn(true);
    toast.info('Вход как гость');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginInput('');
    setPasswordInput('');
    setActiveTab('catalog');
  };



  const canUseFilters = currentUser?.role === 'manager' || currentUser?.role === 'admin';
  const canManageOrders = currentUser?.role === 'manager' || currentUser?.role === 'admin';

  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
                          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-primary" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Магазин обуви</h1>
              <p className="text-gray-500">Войдите в систему</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Input
                  placeholder="Логин"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleLogin} className="w-full h-12 text-base" size="lg">
                Войти
              </Button>
              <Button onClick={handleGuestLogin} variant="outline" className="w-full h-12 text-base" size="lg">
                Войти как гость
              </Button>
            </div>

            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Тестовые данные:</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>client / 123 (Клиент)</p>
                <p>manager / 123 (Менеджер)</p>
                <p>admin / 123 (Администратор)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="ShoppingBag" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">Магазин обуви</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{currentUser?.name}</p>
              <Badge variant="secondary" className="text-xs">
                {currentUser?.role === 'guest' && 'Гость'}
                {currentUser?.role === 'client' && 'Клиент'}
                {currentUser?.role === 'manager' && 'Менеджер'}
                {currentUser?.role === 'admin' && 'Администратор'}
              </Badge>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <Button
              variant={activeTab === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('catalog')}
              className="rounded-none border-b-2"
            >
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Каталог
            </Button>
            {canManageOrders && (
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('orders')}
                className="rounded-none border-b-2"
              >
                <Icon name="Package" size={18} className="mr-2" />
                Заказы
              </Button>
            )}
            <Button
              variant={activeTab === 'pickup' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('pickup')}
              className="rounded-none border-b-2"
            >
              <Icon name="MapPin" size={18} className="mr-2" />
              Пункты выдачи
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Каталог обуви</h2>
              
              {canUseFilters && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <div className="mb-4">
                    <Input
                      placeholder="Поиск по названию, бренду или описанию..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Категория:</p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === '' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory('')}
                      >
                        Все
                      </Button>
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.brand}</Badge>
                      {product.discount > 0 && (
                        <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      {product.discount > 0 ? (
                        <>
                          <p className="text-2xl font-bold text-primary">{product.priceWithDiscount?.toLocaleString('ru-RU')} ₽</p>
                          <p className="text-sm text-gray-400 line-through">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </>
                      ) : (
                        <p className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Icon name="Package" size={14} />
                      <span>На складе: {product.stock} шт.</span>
                    </div>

                    {currentUser?.role !== 'guest' && (
                      <Button className="w-full" onClick={() => toast.success('Товар добавлен в корзину!')}>
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Товары не найдены</p>
                <Button variant="link" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && canManageOrders && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Заказы</h2>
            <div className="space-y-4">
              {MOCK_ORDERS.map(order => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge>Заказ #{order.id}</Badge>
                          <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{order.productName}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Размер: {order.size}</p>
                          <p>Количество: {order.quantity}</p>
                          <p>Дата заказа: {new Date(order.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{order.total.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pickup' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Пункты выдачи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PICKUP_POINTS.map(point => (
                <Card key={point.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{point.name}</h3>
                        <p className="text-sm text-gray-600">{point.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon name="Clock" size={16} />
                      <span>{point.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}