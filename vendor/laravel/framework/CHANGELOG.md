# Release Notes for 11.x

## [Unreleased](https://github.com/laravel/framework/compare/v11.3.0...11.x)

## [v11.3.0](https://github.com/laravel/framework/compare/v11.2.0...v11.3.0) - 2024-04-09

* [10.x] Prevent Redis connection error report flood on queue worker by [@kasus](https://github.com/kasus) in https://github.com/laravel/framework/pull/50812
* [11.x] Optimize SetCacheHeaders to ensure error responses aren't cached by [@MinaWilliam](https://github.com/MinaWilliam) in https://github.com/laravel/framework/pull/50903
* [11.x] Add session `hasAny` method by [@mahmoudmohamedramadan](https://github.com/mahmoudmohamedramadan) in https://github.com/laravel/framework/pull/50897
* [11.x] Add option to report throttled exception in ThrottlesExceptions middleware by [@JaZo](https://github.com/JaZo) in https://github.com/laravel/framework/pull/50896
* [11.x] Add DeleteWhenMissingModels attribute by [@Neol3108](https://github.com/Neol3108) in https://github.com/laravel/framework/pull/50890
* [11.x] Allow customizing TrimStrings::$except by [@grohiro](https://github.com/grohiro) in https://github.com/laravel/framework/pull/50901
* [11.x] Add pull methods to Context by [@renegeuze](https://github.com/renegeuze) in https://github.com/laravel/framework/pull/50904
* [11.x] Remove redundant code from MariaDbGrammar by [@hafezdivandari](https://github.com/hafezdivandari) in https://github.com/laravel/framework/pull/50907
* [11.x] Explicit nullable parameter declarations to fix PHP 8.4 deprecation by [@Jubeki](https://github.com/Jubeki) in https://github.com/laravel/framework/pull/50922
* [11.x] Add setters to cache stores by [@stancl](https://github.com/stancl) in https://github.com/laravel/framework/pull/50912
* [10.x] Laravel 10x optional withSize for hasTable by [@apspan](https://github.com/apspan) in https://github.com/laravel/framework/pull/50888
* [11.x] Fix prompting for missing array arguments on artisan command by [@macocci7](https://github.com/macocci7) in https://github.com/laravel/framework/pull/50850
* [11.x] Add strict-mode safe hasAttribute method to Eloquent by [@mateusjatenee](https://github.com/mateusjatenee) in https://github.com/laravel/framework/pull/50909
* [11.x] add function to get faked events by [@browner12](https://github.com/browner12) in https://github.com/laravel/framework/pull/50905
* [11.x] `retry` func - catch "Throwable" instead of Exception by [@sethsandaru](https://github.com/sethsandaru) in https://github.com/laravel/framework/pull/50944
* chore: remove repetitive words by [@findseat](https://github.com/findseat) in https://github.com/laravel/framework/pull/50943
* [10.x] Add `serializeAndRestore()` to `NotificationFake` by [@dbpolito](https://github.com/dbpolito) in https://github.com/laravel/framework/pull/50935
* [11.x] Prevent crash when handling ConnectionException in HttpClient retry logic by [@shinsenter](https://github.com/shinsenter) in https://github.com/laravel/framework/pull/50955
* [11.x] Remove unknown parameters by [@naopusyu](https://github.com/naopusyu) in https://github.com/laravel/framework/pull/50965
* [11.x] Fixed typo in PHPDoc `[@param](https://github.com/param)` by [@naopusyu](https://github.com/naopusyu) in https://github.com/laravel/framework/pull/50967
* [11.x] Fix dockblock by [@michaelnabil230](https://github.com/michaelnabil230) in https://github.com/laravel/framework/pull/50979
* [11.x] Allow time to be faked in database lock by [@JurianArie](https://github.com/JurianArie) in https://github.com/laravel/framework/pull/50981
* [11.x] Introduce method `Http::createPendingRequest()` by [@Jacobs63](https://github.com/Jacobs63) in https://github.com/laravel/framework/pull/50980
* [11.x] Add [@throws](https://github.com/throws) to some doc blocks by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50969
* [11.x] Fix PHP_MAXPATHLEN check for existing check of files for views by [@joshuaruesweg](https://github.com/joshuaruesweg) in https://github.com/laravel/framework/pull/50962
* [11.x] Allow to remove scopes from BelongsToMany relation by [@plumthedev](https://github.com/plumthedev) in https://github.com/laravel/framework/pull/50953
* [11.x] Throw exception if named rate limiter and model property do not exist by [@mateusjatenee](https://github.com/mateusjatenee) in https://github.com/laravel/framework/pull/50908

## [v11.2.0](https://github.com/laravel/framework/compare/v11.1.1...v11.2.0) - 2024-04-02

* [11.x] Fix: update `[@param](https://github.com/param)` in some doc block by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50827
* [11.x] Fix: update [@return](https://github.com/return) in some doc blocks by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50826
* [11.x] Fix retrieving generated columns on legacy PostgreSQL by [@hafezdivandari](https://github.com/hafezdivandari) in https://github.com/laravel/framework/pull/50834
* [11.x] Trim invisible characters by [@dasundev](https://github.com/dasundev) in https://github.com/laravel/framework/pull/50832
* [11.x] Add default value for `get` and `getHidden` on `Context` by [@michaelnabil230](https://github.com/michaelnabil230) in https://github.com/laravel/framework/pull/50824
* [11.x] Improves `serve` Artisan command by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50821
* [11.x] Rehash user passwords when logging in once by [@axlon](https://github.com/axlon) in https://github.com/laravel/framework/pull/50843
* [11.x] Do not wipe database if it does not exists by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50838
* [11.x] Better database creation failure handling by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50836
* [11.x] Use Default Schema Name on SQL Server by [@hafezdivandari](https://github.com/hafezdivandari) in https://github.com/laravel/framework/pull/50855
* Correct typing for startedAs and virtualAs database column definitions by [@ollieread](https://github.com/ollieread) in https://github.com/laravel/framework/pull/50851
* Allow passing query Expression as column in Many-to-Many relationship by [@plumthedev](https://github.com/plumthedev) in https://github.com/laravel/framework/pull/50849
* [11.x] Fix `Middleware::trustHosts(subdomains: true)` by [@axlon](https://github.com/axlon) in https://github.com/laravel/framework/pull/50877
* [11.x] Modify doc blocks for getGateArguments by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50874
* [11.x] Add `[@throws](https://github.com/throws)` to doc block for resolve method by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50873
* [11.x] Str trim methods by [@patrickomeara](https://github.com/patrickomeara) in https://github.com/laravel/framework/pull/50822
* [11.x] Add fluent helper by [@PhiloNL](https://github.com/PhiloNL) in https://github.com/laravel/framework/pull/50848
* [11.x] Add a new helper for context by [@michaelnabil230](https://github.com/michaelnabil230) in https://github.com/laravel/framework/pull/50878
* [11.x] `assertChain` and `assertNoChain` on job instance by [@gdebrauwer](https://github.com/gdebrauwer) in https://github.com/laravel/framework/pull/50858
* [11.x] Remove redundant `getDefaultNamespace` method in some classes (class, interface and trait commands) by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50880
* [11.x] Remove redundant implementation of ConnectorInterface in MariaDbConnector by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50881
* [11.X] Fix: error when using `orderByRaw` in query before using `cursorPaginate` by [@ngunyimacharia](https://github.com/ngunyimacharia) in https://github.com/laravel/framework/pull/50887

## [v11.1.1](https://github.com/laravel/framework/compare/v11.1.0...v11.1.1) - 2024-03-28

* [11.x] Fix: update `[@param](https://github.com/param)` in doc blocks by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50791
* [11.x] Fix query builder `whereBetween` with CarbonPeriod and Carbon 3 by [@bakerkretzmar](https://github.com/bakerkretzmar) in https://github.com/laravel/framework/pull/50792
* [11.x] Allows asserting no output in Artisan commands by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50702
* fix typo by [@elguitarraverde](https://github.com/elguitarraverde) in https://github.com/laravel/framework/pull/50808
* [11.x] Make DB::usingConnection() respect read/write type by [@SajtiDH](https://github.com/SajtiDH) in https://github.com/laravel/framework/pull/50806
* [11.x] Fix deprecation warning caused by Carbon 3.2 by [@JackWH](https://github.com/JackWH) in https://github.com/laravel/framework/pull/50813

## [v11.1.0](https://github.com/laravel/framework/compare/v11.0.8...v11.1.0) - 2024-03-26

* [11.x] MySQL transaction isolation level fix by [@mwikberg-virta](https://github.com/mwikberg-virta) in https://github.com/laravel/framework/pull/50689
* [11.x] Add ListManagementOptions in SES mail transport by [@arifszn](https://github.com/arifszn) in https://github.com/laravel/framework/pull/50660
* [11.x] Accept non-backed enum in database queries by [@gbalduzzi](https://github.com/gbalduzzi) in https://github.com/laravel/framework/pull/50674
* [11.x] Add `Conditionable` trait to `Context` by [@michaelnabil230](https://github.com/michaelnabil230) in https://github.com/laravel/framework/pull/50707
* [11.x] Adds `[@throws](https://github.com/throws)` section to the Context's doc blocks by [@rnambaale](https://github.com/rnambaale) in https://github.com/laravel/framework/pull/50715
* [11.x] Test modifying nullable columns by [@hafezdivandari](https://github.com/hafezdivandari) in https://github.com/laravel/framework/pull/50708
* [11.x] Introduce HASH_VERIFY env var by [@valorin](https://github.com/valorin) in https://github.com/laravel/framework/pull/50718
* [11.x] Apply default timezone when casting unix timestamps by [@daniser](https://github.com/daniser) in https://github.com/laravel/framework/pull/50751
* [11.x] Fixes `ApplicationBuilder::withCommandRouting()` usage by [@crynobone](https://github.com/crynobone) in https://github.com/laravel/framework/pull/50742
* [11.x] Register console commands, paths and routes after the app is booted by [@plumthedev](https://github.com/plumthedev) in https://github.com/laravel/framework/pull/50738
* [11.x] Enhance malformed request handling by [@jnoordsij](https://github.com/jnoordsij) in https://github.com/laravel/framework/pull/50735
* [11.x] Adds `withSchedule` to `bootstrap/app.php` file by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50755
* [11.x] Fix dock block for create method in `InvalidArgumentException.php` by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50762
* [11.x] signature typo by [@abrahamgreyson](https://github.com/abrahamgreyson) in https://github.com/laravel/framework/pull/50766
* [11.x] Simplify `ApplicationBuilder::withSchedule()` by [@crynobone](https://github.com/crynobone) in https://github.com/laravel/framework/pull/50765

## [v11.0.8](https://github.com/laravel/framework/compare/v11.0.7...v11.0.8) - 2024-03-21

* [11.x] Change typehint for enum rule from string to class-string by [@liamduckett](https://github.com/liamduckett) in https://github.com/laravel/framework/pull/50603
* [11.x] Fixed enum and enum.backed stub paths after publish by [@haroon-mahmood-4276](https://github.com/haroon-mahmood-4276) in https://github.com/laravel/framework/pull/50629
* [11.x] Fix(ScheduleListCommand): fix doc block for listEvent method by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50638
* [11.x] Re: Fix issue with missing 'js/' directory in broadcasting installation command by [@alnahian2003](https://github.com/alnahian2003) in https://github.com/laravel/framework/pull/50657
* [11.x] Remove `$except` property from `ExcludesPaths` trait by [@gdebrauwer](https://github.com/gdebrauwer) in https://github.com/laravel/framework/pull/50644
* [11.x] Fix command alias registration and usage. by [@timacdonald](https://github.com/timacdonald) in https://github.com/laravel/framework/pull/50617
* [11.x] Fixed make:session-table Artisan command cannot be executed if a migration exists by [@naopusyu](https://github.com/naopusyu) in https://github.com/laravel/framework/pull/50615
* [11.x] Fix(src\illuminate\Queue): update doc block, Simplification of the code in RedisManager by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50635
* [11.x] Add `--without-reverb` and `--without-node` arguments to `install:broadcasting` command by [@duncanmcclean](https://github.com/duncanmcclean) in https://github.com/laravel/framework/pull/50662
* [11.x] Fixed `trait` stub paths after publish by [@haroon-mahmood-4276](https://github.com/haroon-mahmood-4276) in https://github.com/laravel/framework/pull/50678
* [11.x] Fixed `class` and `class.invokable` stub paths after publish by [@haroon-mahmood-4276](https://github.com/haroon-mahmood-4276) in https://github.com/laravel/framework/pull/50676
* [10.x] Fix `Collection::concat()` return type by [@axlon](https://github.com/axlon) in https://github.com/laravel/framework/pull/50669
* [11.x] Fix adding multiple bootstrap providers with opcache by [@jessarcher](https://github.com/jessarcher) in https://github.com/laravel/framework/pull/50665
* [11.x] Allow `BackedEnum` and `UnitEnum` in `Rule::in` and `Rule::notIn` by [@PerryvanderMeer](https://github.com/PerryvanderMeer) in https://github.com/laravel/framework/pull/50680
* [10.x] Fix command alias registration and usage by [@crynobone](https://github.com/crynobone) in https://github.com/laravel/framework/pull/50695

## [v11.0.7](https://github.com/laravel/framework/compare/v11.0.6...v11.0.7) - 2024-03-15

* [11.x] Re-add translations for ValidationException by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50546
* [11.x] Removes unused Dumpable trait by [@OussamaMater](https://github.com/OussamaMater) in https://github.com/laravel/framework/pull/50559
* [11.x] Fix withRouting docblock type by [@santigarcor](https://github.com/santigarcor) in https://github.com/laravel/framework/pull/50563
* [11.x] Fix docblock in FakeInvokedProcess.php by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50568
* [11.x] fix: Add missing InvalidArgumentException import to Database/Schema/SqlServerBuilder by [@ayutaya](https://github.com/ayutaya) in https://github.com/laravel/framework/pull/50573
* [11.x] Improved translation for displaying the count of errors in the validation message by [@andrey-helldar](https://github.com/andrey-helldar) in https://github.com/laravel/framework/pull/50560
* [11.x] Fix retry_after to be an integer by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50580
* [11.x] Use available `getPath()` instead of using `app_path()` to detect if base controller exists by [@crynobone](https://github.com/crynobone) in https://github.com/laravel/framework/pull/50583
* [11.x] Fix doc block: `[@return](https://github.com/return) static` has been modified to `[@return](https://github.com/return) void` by [@saMahmoudzadeh](https://github.com/saMahmoudzadeh) in https://github.com/laravel/framework/pull/50592
* accept attributes for channels by [@taylorotwell](https://github.com/taylorotwell) in https://github.com/laravel/framework/commit/398f49485e305756409b52af64837c784fd30de9

## [v11.0.6](https://github.com/laravel/framework/compare/v11.0.5...v11.0.6) - 2024-03-14

* [11.x] Fix version constraints for illuminate/process by [@riesjart](https://github.com/riesjart) in https://github.com/laravel/framework/pull/50524
* [11.x] Update Broadcasting Install Command With Bun Support by [@HDVinnie](https://github.com/HDVinnie) in https://github.com/laravel/framework/pull/50525
* [11.x] Allows to comment `web` and `health` routes by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50533
* [11.x] Add generics for Arr::first() by [@phh](https://github.com/phh) in https://github.com/laravel/framework/pull/50514
* Change default collation for MySQL by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50555
* [11.x] Fixes install:broadcasting command by [@joedixon](https://github.com/joedixon) in https://github.com/laravel/framework/pull/50550
* [11.x] Fix crash when configuration directory is non-existing by [@buismaarten](https://github.com/buismaarten) in https://github.com/laravel/framework/pull/50537

## [v11.0.5](https://github.com/laravel/framework/compare/v11.0.4...v11.0.5) - 2024-03-13

* [11.x] Improves broadcasting install by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50519
* [11.x] Improved exception message on 'ensure' method by [@fgaroby](https://github.com/fgaroby) in https://github.com/laravel/framework/pull/50517
* [11.x] Add hasValidRelativeSignatureWhileIgnoring macro by [@br13an](https://github.com/br13an) in https://github.com/laravel/framework/pull/50511
* [11.x] Prevents database redis options of being merged by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50523

## [v11.0.4](https://github.com/laravel/framework/compare/v11.0.3...v11.0.4) - 2024-03-13

* [11.x] Add class_exists check for `Spark`'s `subscribed` default alias Middleware by [@akr4m](https://github.com/akr4m) in https://github.com/laravel/framework/pull/50489
* [11.x] Fix: Removed TTY mode to resolve Windows compatibility issue  by [@yourchocomate](https://github.com/yourchocomate) in https://github.com/laravel/framework/pull/50495
* [11.x] Check for password before storing hash in session by [@valorin](https://github.com/valorin) in https://github.com/laravel/framework/pull/50507
* [11.x] Fix an issue with missing controller class by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50505
* [11.x] Add default empty config when creating repository within CacheManager by [@noefleury](https://github.com/noefleury) in https://github.com/laravel/framework/pull/50510

## [v11.0.3](https://github.com/laravel/framework/compare/v11.0.2...v11.0.3) - 2024-03-12

* [11.x] Arr helper map spread by [@bilfeldt](https://github.com/bilfeldt) in https://github.com/laravel/framework/pull/50474
* [11.x] add `list` rule by [@medilies](https://github.com/medilies) in https://github.com/laravel/framework/pull/50454
* [11.x] Fixes installation of passport by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50488

## [v11.0.2](https://github.com/laravel/framework/compare/v11.0.1...v11.0.2) - 2024-03-12

* [11.x] Adds `--graceful` to `php artisan migrate` by [@nunomaduro](https://github.com/nunomaduro) in https://github.com/laravel/framework/pull/50486

## [v11.0.1](https://github.com/laravel/framework/compare/v11.0.0..v11.0.1) - 2024-03-12

* [10.x] Update mockery conflict to just disallow the broken version by [@GrahamCampbell](https://github.com/GrahamCampbell) in https://github.com/laravel/framework/pull/50472
* [10.x] Conflict with specific release by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50473
* [10.x] Fix for attributes being escaped on Dynamic Blade Components by [@pascalbaljet](https://github.com/pascalbaljet) in https://github.com/laravel/framework/pull/50471
* [10.x] Revert PR 50403 by [@driesvints](https://github.com/driesvints) in https://github.com/laravel/framework/pull/50482

## v11.0.0 - 2024-03-12

Check the upgrade guide in the [Official Laravel Upgrade Documentation](https://laravel.com/docs/11.x/upgrade). Also you can see some release notes in the [Official Laravel Release Documentation](https://laravel.com/docs/11.x/releases).
