import { PageHeader, Button, Input, Space, Badge } from 'antd';
import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
import './Header.css'
import DeixaStore from "../images/logo.png";
import USA from "../images/usa.png";
import BookStore from "../images/nftstore.png";
import {ShoppingCartOutlined, MenuOutlined} from "@ant-design/icons";

const {Search } = Input;
const categories = ["Videos", "Pictures", "GIFs", "Models3D", "Audios"];

const Header = () => {
  const { authenticate, account } = useMoralis();
  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
          <img src={DeixaStore} className="logo"></img>
          <img src={BookStore} className="logo" hidden></img>
          <Search
              placeholder="Find A Product"
              enterButton
              className = "searchBar"
            />
         <Button 
         className="login"
         key="1" 
         type="primary" 
         onClick={() => authenticate()}>
          {account ? <span>...{account.slice(-7)}</span> : <span>Crypto Login</span>}
          </Button>
          <Space size={"large"}>
              
              <Badge count={0} showZero>
                <span className="header-buttons">
                  <ShoppingCartOutlined className="header-icon" />
                  Cart
                </span>
              </Badge>
              <Space className="header-buttons" size={"small"}>
                <img src={USA} alt="region" className="flag" hidden></img>▾
              </Space>
              
            </Space>
          </>
        ]}>
      </PageHeader>
      <div className="site-page-subheader-ghost-wrapper">
      <Space size={"middle"}>
        <Space size={"small"} style={{fontWeight:"bold"}}>
          <MenuOutlined />
          Categories
        </Space>
        {categories.map((e) =>{
          return(
            <Link to="/categories" state={e} className="categories">
              {e}
            </Link>
          )

        })}
      </Space>
    </div>
    </div>
  )
}

export default Header;