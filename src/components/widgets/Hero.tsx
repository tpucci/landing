import { component$ } from "@builder.io/qwik";
import { Perspective } from "./Perspective/Perspective";

export default component$(() => {
  return (
    <div class="relative">
      <Perspective />
      <section class="bg-gradient-to-b md:bg-gradient-to-r from-sky-100 via-purple-50/10 to-white/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-sky-900/20 mt-[-72px] relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 md:flex md:h-screen 2xl:h-auto pt-[72px]">
          <div class="py-12 md:py-12 lg:py-16 block md:flex text-center md:text-left">
            <div class="pb-12 md:pb-0 md:py-0 mx-auto md:pr-16 flex items-center basis-3/5">
              <div>
                <h1 class="text-5xl md:text-[3.48rem] font-bold leading-tighter tracking-tighter mb-4 font-heading px-4 md:px-0">
                  <span>Intelligible</span>{" "}
                  <span class="text-primary-500">Roadmap</span>{" "}
                  <span>to align the team</span>
                  <br class="hidden lg:block" />{" "}
                  <span class="hidden lg:inline">with the plan</span>
                </h1>
                <div class="max-w-3xl mx-auto">
                  <p class="text-xl text-gray-600 mb-8 dark:text-slate-400">
                    <span class="font-semibold underline decoration-wavy decoration-1 decoration-primary-600 underline-offset-2">
                      Cadence
                    </span>{" "}
                    is an infinite canvas to visualize your issues. It aims to
                    bring clarity to who does what and in which order.
                    <br class="hidden lg:block" />{" "}
                    <span class="hidden md:inline">
                      Beautifully crafted for performance. Connected to your
                      issue tracker tool: Notion, Jira, Linear, Trello.
                    </span>
                  </p>
                  <div class="max-w-xs sm:max-w-md flex flex-nowrap flex-col sm:flex-row gap-4 m-auto md:m-0 justify-center md:justify-start">
                    <div class="flex w-full sm:w-auto">
                      <a
                        class="btn btn-primary sm:mb-0 w-full"
                        href="https://cadence.page"
                        target="_blank"
                        rel="noopener"
                      >
                        Try it
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
    </div>
  );
});
