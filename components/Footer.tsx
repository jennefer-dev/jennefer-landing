import JenneferLogo from "./JenneferLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090a0c] px-5 py-12 text-[#9b9da5] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#hero" className="inline-flex items-center gap-3 text-white"><JenneferLogo className="h-8 w-8" /><span className="text-lg font-semibold tracking-[-0.05em]">Jennefer</span></a>
          <p className="mt-4 max-w-md text-sm leading-6">A private engineering workspace for teams building with local AI.</p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
          <a href="#anatomy" className="hover:text-white">Product</a>
          <a href="#features" className="hover:text-white">How it works</a>
          <a href="#privacy" className="hover:text-white">Privacy</a>
          <a href="mailto:contact@jennefer.dev" className="hover:text-white">Contact</a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1380px] border-t border-white/10 pt-6 text-xs">© 2026 Jennefer. A product of Ahmet Enes LLC.</div>
    </footer>
  );
}
