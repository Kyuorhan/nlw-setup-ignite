import logoImage from '../assets/logo.svg'
import { HabitCreationHabit } from './HabitCreationModal'

export function Header() {

  return (    
    <div className="
      w-full 
      max-w-3xl 
      mx-auto 
      flex 
      items-center 
      justify-between"
    >    
    <img src={logoImage} alt="Habits"/> 

    <HabitCreationHabit />

  </div>
  )
    
}