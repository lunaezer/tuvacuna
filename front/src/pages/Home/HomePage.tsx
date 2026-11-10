import HomeHero from '../../components/Home/HomeHero/HomeHero'
import HomePanel from '../../components/Home/HomePanel/HomePanel'
import HomeComoFunciona from '../../components/Home/HomeComoFunciona/HomeComoFunciona'
import HomeFunciones from '../../components/Home/HomeFunciones/HomeFunciones'
import HomeCta from '../../components/Home/HomeCta/HomeCta'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="pagina-inicio">
      <HomeHero />
      <HomePanel />
      <HomeComoFunciona />
      <HomeFunciones />
      <HomeCta />
    </div>
  )
}
