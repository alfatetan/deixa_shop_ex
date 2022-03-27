import {Select, Button, Modal, Input} from 'antd'
import {ShoppingCartOutlined} from "@ant-design/icons";
import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { paymentData } from '../paymentdata';
import Password from 'antd/lib/input/Password';

const {Option} = Select;
function Purchase({book}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const {Moralis, account} = useMoralis();
  
  
  
  const handleOk = async () => {
    
    
    // Get The Price of ACR
    
    const currencyData = {
      address: paymentData.contractAddress,
      chain: paymentData.chain,
    };

    const price = await Moralis.Web3API.token.getTokenPrice(currencyData);
    const priceACR = book.price / price.usdPrice;
    
    console.log('Price of purchase is $', book.price);
    console.log('Price of ACR is $', price.usdPrice);
    console.log('Price of purchase in ACR is ', priceACR);

    
    // Send ACR to deixa store owner address

    const receiverOptions = {
      type: paymentData.typeOfContract,
      amount: Moralis.Units.Token(priceACR, paymentData.decimals), 
      receiver: paymentData.sellerWallet,
      contractAddress: paymentData.contractAddress,
    };

    let result = await Moralis.transfer(receiverOptions);

    //Save Transaction Details to DB
    console.log('Save the transaction details');
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("Delivery", delivery);
    transaction.set("Product", book.name);

    transaction.save()
    setIsModalVisible(false);
  }

  return (
    <>
      <span className="price"> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      <h3>Quantity</h3>
      <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select>
      <Button className="login"
      style={{ width: "100%", marginTop: "50px" }}
      onClick={()=>setIsModalVisible(true)}>
      <ShoppingCartOutlined /> Buy Now
    </Button>
      
      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={()=>setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${book.price}</h2>
            <h4>Delivery Address</h4>
            <Input onChange={(value) => setDelivery(value.target.value)}></Input>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Purchase;
