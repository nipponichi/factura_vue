<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"  rel="stylesheet" />

        

        <!-- Scripts -->
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
        @inertia
    </body>
    

    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">©<a href="https://flowbite.com/" class="hover:underline">Ingeoriol S.L.</a>. {{ __('All Rights Reserved') }}.
            </span>

            <!--
            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="" class="hover:underline me-4 md:me-6">{{ __('About') }}</a>
                </li>
                <li>
                    <a href="" class="hover:underline me-4 md:me-6">{{ __('Privacy Policy') }}</a>
                </li>
                <li>
                    <a href="" class="hover:underline me-4 md:me-6">{{ __('Licensing') }}</a>
                </li>
                <li>
                    <a href="" class="hover:underline">{{ __('Contact') }}</a>
                </li>
            </ul>-->
            
        </div>
    </footer>

</html>
