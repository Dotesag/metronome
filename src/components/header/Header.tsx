
export default function Header() {
  return (
    // TODO: remaster block-shadow
    <section className='py-3 sm:px-25 px-10 text-2xl flex justify-between items-center shadow-2xl shadow-gray-100 border border-gray-200'>
      <div className="flex gap-2">
        <p className="text-[#1E90FF] font-medium">Умный</p>
        <p>Метроном</p>
      </div>
      <img src='./icons/github.svg' alt='GitHub' className='w-9 h-9' />
    </section>
  );
}