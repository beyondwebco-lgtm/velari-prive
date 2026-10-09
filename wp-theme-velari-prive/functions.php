<?php
/**
 * VELARI PRIVÉ — Theme Functions & Definitions
 * Lightweight, zero-bloat WordPress architecture for Hostinger
 * 
 * @package VelariPrive
 * @author Beyond Webco
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 */
function velari_prive_setup() {
    // Make theme available for translation
    load_theme_textdomain('velari-prive', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');

    // Switch default core markup for search form, comment form, etc to HTML5
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);

    // Register Navigation Menus
    register_nav_menus([
        'primary' => __('Primary Navigation', 'velari-prive'),
        'footer'  => __('Footer Navigation', 'velari-prive'),
    ]);
}
add_action('after_setup_theme', 'velari_prive_setup');

/**
 * Enqueue scripts and styles
 */
function velari_prive_scripts() {
    // Enqueue Google Fonts
    wp_enqueue_style(
        'velari-fonts',
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@200;300;400;500;600&display=swap',
        [],
        null
    );

    // Theme Main Stylesheet
    wp_enqueue_style(
        'velari-style',
        get_stylesheet_uri(),
        ['velari-fonts'],
        '1.0.0'
    );

    // Main JavaScript
    wp_enqueue_script(
        'velari-main-js',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        '1.0.0',
        true
    );

    // Localize Script for AJAX / Config
    wp_localize_script('velari-main-js', 'velariConfig', [
        'ajaxUrl'        => admin_url('admin-ajax.php'),
        'nonce'          => wp_create_nonce('velari_secure_nonce'),
        'scienceSiteUrl' => 'https://36ausbiotech.com/',
        'siteUrl'        => home_url('/'),
    ]);
}
add_action('wp_enqueue_scripts', 'velari_prive_scripts');

/**
 * Register Custom Post Type: Journal Folios
 */
function velari_register_journal_cpt() {
    $labels = [
        'name'               => _x('Journal Folios', 'post type general name', 'velari-prive'),
        'singular_name'      => _x('Journal Folio', 'post type singular name', 'velari-prive'),
        'menu_name'          => _x('Journal', 'admin menu', 'velari-prive'),
        'add_new'            => _x('Add New Folio', 'folio', 'velari-prive'),
        'add_new_item'       => __('Add New Journal Folio', 'velari-prive'),
        'edit_item'          => __('Edit Folio', 'velari-prive'),
        'new_item'           => __('New Folio', 'velari-prive'),
        'all_items'          => __('All Folios', 'velari-prive'),
        'view_item'          => __('View Folio', 'velari-prive'),
        'search_items'       => __('Search Folios', 'velari-prive'),
        'not_found'          => __('No folios found', 'velari-prive'),
        'not_found_in_trash' => __('No folios found in Trash', 'velari-prive'),
    ];

    $args = [
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => ['slug' => 'journal'],
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-book-alt',
        'supports'           => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'show_in_rest'       => true,
    ];

    register_post_type('journal', $args);
}
add_action('init', 'velari_register_journal_cpt');

/**
 * Security: Remove WordPress Version info
 */
remove_action('wp_head', 'wp_generator');
