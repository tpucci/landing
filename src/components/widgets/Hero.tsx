import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="bg-gradient-to-b md:bg-gradient-to-r from-white via-purple-50 to-sky-100 dark:from-slate-900 dark:via-purple-900/10 dark:to-sky-900/20 mt-[-72px]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 md:flex md:h-screen 2xl:h-auto pt-[72px]">
        <div class="py-12 md:py-12 lg:py-16 block md:flex text-center md:text-left">
          <div class="pb-12 md:pb-0 md:py-0 mx-auto md:pr-16 flex items-center basis-3/5">
            <div>
              <h1 class="text-5xl md:text-[3.48rem] font-bold leading-tighter tracking-tighter mb-4 font-heading px-4 md:px-0">
                Free template for <br class="hidden lg:block" />{" "}
                <span class="hidden lg:inline">create a website using </span>{" "}
                <span class="text-[#039de1]">Qwik</span> +{" "}
                <span class="sm:whitespace-nowrap text-[#039de1]">
                  Tailwind CSS
                </span>
              </h1>
              <div class="max-w-3xl mx-auto">
                <p class="text-xl text-gray-600 mb-8 dark:text-slate-400">
                  <span class="font-semibold underline decoration-wavy decoration-1 decoration-secondary-600 underline-offset-2">
                    Qwind
                  </span>{" "}
                  is a production ready template to start your new website using{" "}
                  <em>Qwik</em> + <em>Tailwind CSS</em>. It has been designed
                  following Best Practices, SEO, Accessibility,{" "}
                  <span class="inline md:hidden">...</span>
                  <span class="hidden md:inline">
                    Dark Mode, Great Page Speed, image optimization, sitemap
                    generation and more.
                  </span>
                </p>
                <div class="max-w-xs sm:max-w-md flex flex-nowrap flex-col sm:flex-row gap-4 m-auto md:m-0 justify-center md:justify-start">
                  <div class="flex w-full sm:w-auto">
                    <a
                      class="btn btn-primary sm:mb-0 w-full"
                      href="https://github.com/onwidget/qwind"
                      target="_blank"
                      rel="noopener"
                    >
                      Get template
                    </a>
                  </div>
                  <div class="flex w-full sm:w-auto">
                    <button class="btn w-full bg-gray-50 dark:bg-transparent">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1" />
        </div>
      </div>
    </section>
  );
});
