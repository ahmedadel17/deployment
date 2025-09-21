<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <title>Naseem</title>
    <meta name='robots' content='noindex, nofollow' />
    <link rel='stylesheet' id='style-css' href='assets/css/style.css' media='all' />
</head>

<body id="body" class="bg-gray-50 text-base font-ltr rtl:font-rtl dark:text-white dark:bg-gray-900 min-h-screen flex flex-col">



    <!-- Main Header Section -->
    <header id="header" class="te-header flex-shrink-0 sticky top-0 z-50 transition-transform duration-300 sticky-scroll" role="banner">

        <!-- Marquee Slider -->
        <?php include 'template-parts/marquee.php'; ?>

        <!-- Topbar -->
        <?php include 'template-parts/header/header-topbar.php'; ?>

        <!-- Header Style (2) -->
        <?php include 'template-parts/header/styles/header-style-1.php'; ?>

    </header>

    <?php
    $filename = basename($_SERVER['PHP_SELF']);

    // If we are inside index.php
    if ($filename === 'index.php') : ?>
        <!-- Main Content Area -->
        <div id="content" class="flex-1 site-content" role="main">
            <div id="primary">
                <main id="main" role="main">

                <?php else : ?>
                    <!-- Main Content Area -->
                    <div id="content" class="flex-1 mt-8 mb-8 site-content" role="main">
                        <div id="primary" class="container">
                            <main id="main" role="main">
                                <!-- Breadcrumb -->
                                <?php include 'template-parts/header/header-breadcrumb.php'; ?>
                            <?php endif; ?>