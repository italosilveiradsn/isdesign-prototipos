<?php
/**
 * IsDesign Casa Roofing: one-page roofing theme.
 * Every text, photo, color and contact detail is editable in Appearance > Customize.
 */
if (!defined('ABSPATH')) { exit; }

/* ---------- Field map: section => [title, [id, type, label, default, width, height]] ---------- */
function cr_schema() {
    return [
        'cr_general' => ['Business info', [
            ['biz_name', 'text', 'Business name', 'Casa Roofing LLC'],
            ['meta_desc', 'textarea', 'Search description (what Google shows under the title)', 'Residential and commercial roofing in Phoenix, Arizona: roof repair, inspections and new roofs. Get a quote within 15 minutes.'],
            ['logo', 'image', 'Logo', 'sel-logo.webp', 280, 100],
            ['phone', 'text', 'Phone number', '(623) 418-3204'],
            ['license', 'text', 'License text (top bar)', 'License ROC#339914'],
            ['nav_1', 'text', 'Menu item 1', 'Roofing services'],
            ['nav_2', 'text', 'Menu item 2', 'Why Casa'],
            ['nav_3', 'text', 'Menu item 3', 'Reviews'],
            ['nav_4', 'text', 'Menu item 4', 'Areas we service'],
            ['nav_5', 'text', 'Menu item 5', 'Contact'],
            ['bar_1', 'text', 'Phone bar, button 1 (mobile)', 'Call or text'],
            ['bar_2', 'text', 'Phone bar, button 2 (mobile)', 'Free quote'],
            ['notice_on', 'checkbox', 'Show the "design concept" notice at the top', true],
            ['notice', 'textarea', 'Notice text', 'Design concept prepared by IsDesign (Brazil) for Casa Roofing LLC. Not affiliated with or endorsed by the company. The logo, text and photos are samples from the current website, shown only to help you picture the result.'],
            ['footer', 'textarea', 'Footer text', '© 2026 Casa Roofing LLC · Design concept prepared by IsDesign (Brazil) as a sample. Not affiliated with this preview. Names, logos, text and photos belong to their owners.'],
        ]],
        'cr_hero' => ['Home: top area', [
            ['hero_kicker', 'text', 'Small line above the title', 'Top-rated roofing contractor · Phoenix, Arizona'],
            ['hero_h1a', 'text', 'Title, first part', 'Protecting what'],
            ['hero_h1b', 'text', 'Title, highlighted part', 'matters the most.'],
            ['hero_text', 'textarea', 'Paragraph', 'Whether you’re in need of a full roof replacement or a roof repair, you can count on our expert team to get the job done.'],
            ['hero_btn1', 'text', 'Main button', 'Get a quote within 15 minutes'],
            ['hero_btn2', 'text', 'Phone button', 'Text or call (623) 418-3204'],
            ['hero_photo', 'image', 'Main photo', 'truck.webp', 1200, 584],
            ['hero_photo_alt', 'text', 'Main photo description (for accessibility)', 'Casa Roofing truck parked in front of a Phoenix home'],
            ['hero_badge1', 'text', 'Photo caption, line 1', 'Tile · Foam · Shingle'],
            ['hero_badge2', 'text', 'Photo caption, line 2', 'Residential & commercial roofing'],
            ['rate_label', 'text', 'Rating box, label', 'Rated by customers'],
            ['rate_num', 'text', 'Rating box, number', '5.0'],
            ['rate_src', 'text', 'Rating box, sources', 'Google · Angi · Facebook'],
            ['lic_label', 'text', 'License box, label', 'Licensed'],
            ['lic_num', 'textarea', 'License box, number (one line per row)', "ROC#\n339914"],
        ]],
        'cr_serv' => ['Services', [
            ['serv_h', 'textarea', 'Heading (one line per row)', "Our roofing\nservices"],
            ['serv_p', 'textarea', 'Intro', 'Residential and commercial roofing across the Arizona area, installed by a local roofing company with a commitment to quality and excellence.'],
            ['s1_t', 'text', 'Service 1, title', 'Roof repair'],
            ['s1_p', 'textarea', 'Service 1, text', 'Concerns about the condition of your roof, noticeable damage or leaks? Our professional contractors inspect the damage and provide an estimate.'],
            ['s1_i', 'image', 'Service 1, photo', 'repair.webp', 750, 374],
            ['s2_t', 'text', 'Service 2, title', 'Roof inspections'],
            ['s2_p', 'textarea', 'Service 2, text', 'Routine inspections can save money and prevent safety hazards. Call today for a free estimate.'],
            ['s2_i', 'image', 'Service 2, photo', 'insp.webp', 750, 374],
            ['s3_t', 'text', 'Service 3, title', 'Residential & commercial new roofs'],
            ['s3_p', 'textarea', 'Service 3, text', 'The roof is the main protective barrier between your property and the elements. It deserves quality and excellence.'],
            ['s3_i', 'image', 'Service 3, photo', 'newroof.webp', 750, 374],
            ['chips', 'textarea', 'Service tags (one per line)', "Roof repair\nTile roofing\nRoof installation\nRoof leak repair\nCoatings\nResidential roofing\nCommercial roofing"],
        ]],
        'cr_why' => ['Why us', [
            ['why_label', 'text', 'Small line', 'Why hire Casa Roofing LLC?'],
            ['why_h', 'text', 'Heading', 'More than just a roofing company.'],
            ['why_p', 'textarea', 'Paragraph', 'Top-quality roofing at a reasonable price. We communicate with the homeowner every step of the way, and we always stay on our timeline and budget without compromising quality.'],
            ['safe_label', 'text', 'Safety box, label', 'How our team keeps you safe'],
            ['safe_1', 'textarea', 'Safety point 1', 'Our team makes it their mission to ensure the safety of our customers and our contractors.'],
            ['safe_2', 'textarea', 'Safety point 2', 'We follow strict industry-approved safety techniques. We never cut corners and we train our team.'],
            ['safe_3', 'textarea', 'Safety point 3', 'Fully licensed and insured roofing contractors, expertly screened and trained for your protection.'],
            ['fin_h', 'text', 'Financing box, title', 'Flexible payment options'],
            ['fin_p', 'textarea', 'Financing box, text', 'Financing available for qualifying roof repairs and replacements through GreenSky.'],
            ['fin_i1', 'image', 'Financing logo 1', 'sel-gs-roof.webp', 320, 100],
            ['fin_i2', 'image', 'Financing logo 2', 'sel-gs-head.webp', 320, 105],
        ]],
        'cr_rev' => ['Reviews', [
            ['rev_h', 'textarea', 'Heading (one line per row)', "Our reputation\nspeaks for itself"],
            ['rev_p', 'text', 'Intro', 'What our happy customers say about working with us.'],
            ['q1_t', 'textarea', 'Review 1, text', 'Randy and his team were very responsive and helpful. They did a fantastic job and left the jobsite clean and pristine. I highly recommend the professionals at Casa Roofing!'],
            ['q1_a', 'text', 'Review 1, name and city', 'Ruth R. · Phoenix, AZ'],
            ['q2_t', 'textarea', 'Review 2, text', 'I am very happy with this company. Very professional, with great business ethics and enthusiasm.'],
            ['q2_a', 'text', 'Review 2, name and city', 'Paul Y. · Scottsdale'],
            ['q3_t', 'textarea', 'Review 3, text', 'Fair pricing and not pushy. He was very patient as we were still working with the insurance company.'],
            ['q3_a', 'text', 'Review 3, name and city', 'Ethan S. · Scottsdale'],
            ['q4_t', 'textarea', 'Review 4, text (wide box)', 'Randy has been great to work with. He and his crew are very helpful and knowledgeable. If you live in Phoenix, Arizona, Casa Roofing is the roofing company to call for your roof.'],
            ['q4_a', 'text', 'Review 4, name and city', 'David G. · Phoenix, AZ'],
            ['brands_label', 'text', 'Logos strip, label', 'Brands we install & ratings'],
            ['b1', 'image', 'Logo 1 (Malarkey Roofing Products)', 'sel-malarkey.webp', 164, 161],
            ['b2', 'image', 'Logo 2 (Eagle Roofing Products)', 'sel-eagle.webp', 164, 161],
            ['b3', 'image', 'Logo 3 (GAF Materials Corporation)', 'sel-gaf.webp', 164, 161],
            ['b4', 'image', 'Logo 4 (Owens Corning)', 'sel-oc.webp', 349, 353],
            ['b5', 'image', 'Logo 5, wide (Polyglass)', 'sel-polyglass.webp', 600, 171],
            ['b6', 'image', 'Logo 6, wide (Westlake Royal Roofing)', 'sel-westlake.webp', 522, 96],
            ['b7', 'image', 'Logo 7 (Google reviews)', 'sel-google.webp', 164, 161],
            ['b8', 'image', 'Logo 8 (Angi)', 'sel-angi.webp', 402, 239],
        ]],
        'cr_areas' => ['Areas and contact', [
            ['areas_label', 'text', 'Areas box, small line', 'Areas we service'],
            ['areas_h', 'text', 'Areas box, heading', 'Across Arizona.'],
            ['a1_c', 'text', 'Area 1, name', 'Maricopa County'],
            ['a1_t', 'text', 'Area 1, cities', 'Phoenix, Scottsdale, Mesa, Chandler…'],
            ['a2_c', 'text', 'Area 2, name', 'Pima County'],
            ['a2_t', 'text', 'Area 2, cities', 'Tucson, Oro Valley, Marana…'],
            ['a3_c', 'text', 'Area 3, name', 'Pinal County'],
            ['a3_t', 'text', 'Area 3, cities', 'Casa Grande, San Tan Valley…'],
            ['a4_c', 'text', 'Area 4, name', 'Yavapai County'],
            ['a4_t', 'text', 'Area 4, cities', 'Prescott, Cottonwood…'],
            ['a5_c', 'text', 'Area 5, name', 'Coconino County'],
            ['a5_t', 'text', 'Area 5, cities', 'Flagstaff, Sedona, Page…'],
            ['ct_label', 'text', 'Contact box, small line', 'Get a free estimate'],
            ['ct_h', 'text', 'Contact box, heading', 'Get a quote within 15 minutes.'],
            ['ct_note', 'text', 'Text under the phone number', 'Just text or call.'],
            ['email', 'text', 'Email shown on the site', 'casaroofingservices@gmail.com'],
            ['hours', 'textarea', 'Business hours (one line per row)', "Monday to Saturday, 6:00 am – 6:00 pm\nSunday closed"],
            ['form_to', 'text', 'Send form messages to (email). Empty = the WordPress admin email', ''],
            ['form_btn', 'text', 'Form button', 'Send'],
        ]],
    ];
}

function cr_default($f) {
    return ($f[1] === 'image') ? get_theme_file_uri('assets/img/' . $f[3]) : $f[3];
}
function cr_field($id) {
    foreach (cr_schema() as $sec) { foreach ($sec[1] as $f) { if ($f[0] === $id) { return $f; } } }
    return null;
}
/* Get a value (with default). */
function cr($id) {
    $f = cr_field($id);
    if (!$f) { return ''; }
    $v = get_theme_mod('cr_' . $id, null);
    if ($v === null || ($v === '' && $f[1] !== 'text' && $f[1] !== 'textarea')) { $v = cr_default($f); }
    return $v;
}
function cr_t($id)  { return esc_html(cr($id)); }
function cr_ml($id) { return nl2br(esc_html(cr($id))); }
function cr_u($id)  { return esc_url(cr($id)); }
function cr_tel() {
    $d = preg_replace('/\D+/', '', cr('phone'));
    if (strlen($d) === 10) { $d = '1' . $d; }
    return 'tel:+' . $d;
}
function cr_img($id, $alt, $extra = '') {
    $f = cr_field($id);
    $w = isset($f[4]) ? ' width="' . (int) $f[4] . '" height="' . (int) $f[5] . '"' : '';
    return '<img src="' . cr_u($id) . '"' . $w . ' alt="' . esc_attr($alt) . '"' . $extra . '>';
}

/* ---------- Theme setup ---------- */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
});

/* Keep the page light: no emoji scripts, no block library CSS on this one-pager. */
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
});
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('isdesign-casa-roofing', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));
    wp_enqueue_script('cr-reveal', get_theme_file_uri('assets/js/reveal.js'), [], wp_get_theme()->get('Version'), true);
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('global-styles');
    wp_dequeue_style('classic-theme-styles');
}, 100);

add_action('wp_head', function () {
    echo '<link rel="preload" as="image" href="' . cr_u('hero_photo') . '" fetchpriority="high">' . "\n";
    $d = trim(cr('meta_desc'));
    if ($d !== '') { echo '<meta name="description" content="' . esc_attr($d) . '">' . "\n"; }
    $c = [];
    foreach (['navy', 'navy2', 'pur', 'pur2', 'sun', 'bg'] as $k) {
        $v = get_theme_mod('cr_color_' . $k, '');
        if ($v) { $c[] = '--' . $k . ':' . sanitize_hex_color($v); }
    }
    if ($c) { echo '<style>:root{' . implode(';', $c) . '}</style>' . "\n"; }
    echo '<noscript><style>.rv{opacity:1;transform:none}</style></noscript>' . "\n";
}, 1);

/* ---------- Customizer ---------- */
add_action('customize_register', function ($wp) {
    $p = 10;
    foreach (cr_schema() as $sid => $sec) {
        $wp->add_section($sid, ['title' => $sec[0], 'priority' => $p++]);
        foreach ($sec[1] as $f) {
            list($id, $type, $label) = $f;
            $key = 'cr_' . $id;
            if ($type === 'checkbox') {
                $wp->add_setting($key, ['default' => $f[3], 'sanitize_callback' => 'wp_validate_boolean']);
                $wp->add_control($key, ['label' => $label, 'section' => $sid, 'type' => 'checkbox']);
            } elseif ($type === 'image') {
                $wp->add_setting($key, ['default' => cr_default($f), 'sanitize_callback' => 'esc_url_raw']);
                $wp->add_control(new WP_Customize_Image_Control($wp, $key, ['label' => $label, 'section' => $sid]));
            } else {
                $wp->add_setting($key, ['default' => $f[3], 'sanitize_callback' => ($type === 'textarea' ? 'sanitize_textarea_field' : 'sanitize_text_field')]);
                $wp->add_control($key, ['label' => $label, 'section' => $sid, 'type' => $type]);
            }
        }
    }
    $wp->add_section('cr_colors', ['title' => 'Brand colors', 'priority' => $p++, 'description' => 'Leave a color empty to use the original one.']);
    $cols = ['navy' => 'Main dark color', 'navy2' => 'Darkest color (top notice and footer)', 'pur' => 'Accent color', 'pur2' => 'Light accent', 'sun' => 'Highlight color (hover and rating box)', 'bg' => 'Page background'];
    foreach ($cols as $k => $label) {
        $wp->add_setting('cr_color_' . $k, ['default' => '', 'sanitize_callback' => 'sanitize_hex_color_no_hash_or_empty']);
        $wp->add_control(new WP_Customize_Color_Control($wp, 'cr_color_' . $k, ['label' => $label, 'section' => 'cr_colors']));
    }
});
function sanitize_hex_color_no_hash_or_empty($v) { return $v ? sanitize_hex_color($v) : ''; }

/* ---------- Contact form (real sending, with spam protection) ---------- */
function cr_handle_form() {
    $back = wp_get_referer() ? wp_get_referer() : home_url('/');
    $back = remove_query_arg('sent', $back);
    if (!isset($_POST['cr_nonce']) || !wp_verify_nonce($_POST['cr_nonce'], 'cr_contact')) {
        wp_safe_redirect(add_query_arg('sent', '0', $back) . '#contact'); exit;
    }
    if (!empty($_POST['cr_website'])) { /* honeypot: bots fill this */
        wp_safe_redirect(add_query_arg('sent', '1', $back) . '#contact'); exit;
    }
    $name  = sanitize_text_field(wp_unslash($_POST['cr_name'] ?? ''));
    $email = sanitize_email(wp_unslash($_POST['cr_email'] ?? ''));
    $phone = sanitize_text_field(wp_unslash($_POST['cr_phone'] ?? ''));
    $msg   = sanitize_textarea_field(wp_unslash($_POST['cr_msg'] ?? ''));
    if ($name === '' || ($email === '' && $phone === '')) {
        wp_safe_redirect(add_query_arg('sent', '0', $back) . '#contact'); exit;
    }
    $to = cr('form_to');
    if (!is_email($to)) { $to = get_option('admin_email'); }
    $headers = ['Content-Type: text/plain; charset=UTF-8'];
    if (is_email($email)) { $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>'; }
    $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$msg\n";
    $ok = wp_mail($to, 'New quote request from ' . get_bloginfo('name'), $body, $headers);
    wp_safe_redirect(add_query_arg('sent', $ok ? '1' : '0', $back) . '#contact'); exit;
}
add_action('admin_post_nopriv_cr_contact', 'cr_handle_form');
add_action('admin_post_cr_contact', 'cr_handle_form');
