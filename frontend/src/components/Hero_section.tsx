
import todo from '../assets/images/todo.svg'

type HeroSectionProps = {
  handleauth: () => Promise<void>;
};



const Hero_section = ({ handleauth }: HeroSectionProps) => {
  return (
      <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 px-6 py-12">
          <div className="flex flex-col items-center text-center md:text-left md:items-start gap-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-orange-500">ToDo List</h1>
              <p onClick={handleauth} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white text-xl md:text-2xl font-semibold py-3 px-6 rounded-lg transition duration-300">
                  Start Adding
              </p>
          </div>
          <img
              src={todo}
              alt="Todo Illustration"
              className="w-full md:w-[40%] max-w-md object-contain"
          />
      </section>

      
  )
}

export default Hero_section
