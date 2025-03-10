import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'
import DashBoard from './pages/user/DashBoard';
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CreateCategory from './pages/admin/CreateCategory.jsx';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import Users from './pages/admin/Users.jsx';
import Orders from './pages/Orders.jsx';
import Profile from './pages/Profile.jsx';
import Products from './pages/admin/Products.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import Search from './pages/Search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Categories from './pages/Categories.jsx';
import CategoryProduct from './pages/CategoryProduct.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
function App() {
  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/search' element={<Search />}/>
    <Route path='/product/:slug' element={<ProductDetails />}/>
    <Route path='/categories' element={<Categories />}/>
    <Route path='/cart' element={<CartPage />}/>
    <Route path='/category/:slug' element={<CategoryProduct />}/>
    <Route path='/about' element={<About />}/>

    <Route path='/dashboard' element={<PrivateRoute />}>
       <Route path='user' element={<DashBoard />}/>
       <Route path='user/orders' element={<Orders />}/>
       <Route path='user/profile' element={<Profile />}/>
    </Route>

    <Route path='/dashboard' element={<AdminRoute />}>
      <Route path='admin' element ={<AdminDashboard />} />
      <Route path='admin/create-category' element ={<CreateCategory />} />
      <Route path='admin/create-product' element ={<CreateProduct />} />
      <Route path='admin/product/:slug' element ={<UpdateProduct />} />
      <Route path='admin/products' element ={<Products />} />
      <Route path='admin/users' element ={<Users />} />
      <Route path='admin/orders' element ={<AdminOrders />} />
    </Route>

    <Route path='/register' element={<Register />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/forgot-password' element={<ForgotPassword />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/contact' element={<Contact />}/>
    <Route path='/policy' element={<Policy />}/>
    <Route path='*' element={<PageNotFound />}/>
   </Routes>
   </>
  );
}

export default App;
