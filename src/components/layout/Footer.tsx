export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-white/70 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p>© {new Date().getFullYear()} AFSECMO Group. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="transition hover:text-[#FF8C00]">
            Privacy
          </a>
          <a href="#" className="transition hover:text-[#FF8C00]">
            Terms
          </a>
          <a href="#" className="transition hover:text-[#FF8C00]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
