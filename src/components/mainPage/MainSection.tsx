
import MyButton from "../../UI/buttons/MyButton";
import Image from 'next/image'

const imageUrl = 'https://img10.reactor.cc/pics/post/shinonome-mozuku-Anime-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Moz9_shinonome-7643546.jpeg'
const imageUrl2 = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80'
const imageUrl3 = 'https://pic.pimg.tw/a21153yhk/1529021090-3435661364_n.jpg'

const MainSection = () => {


  return (
    <div className="main-section">
      <div className="main-section__preview">
          <Image
            src={imageUrl2}
            alt="preview"
            width={500}
            height={400}
            loader={({src}) => src}
            blurDataURL={imageUrl2}
            objectFit="cover"
            placeholder="blur"
          ></Image>
      </div>
      <div className="main-section__content">
        <h1>Free <span>crypto</span> analytics by and for the community</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa in fermentum at vitae.</p>
        <div className="d-flex">
          <MyButton to={'/posts?chapter=news&type=latest'}>View more → </MyButton>
          <MyButton to={'/login'}>Log in now → </MyButton>
        </div>
      </div>
    </div>
  )
}



export default MainSection
