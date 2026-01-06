
export default function Header() {
  return (
    <section className='py-3 px-25 text-2xl flex justify-between items-center drop-shadow-2xl drop-shadow-gray-100 bg-white border border-gray-200'>
      <div className="flex gap-2">
        <p className="text-[#1E90FF] font-medium">Умный</p>
        <p>Метроном</p>
      </div>
      <img src='./icons/github.svg' alt='GitHub' className='w-9 h-9' />
    </section>
  );
}