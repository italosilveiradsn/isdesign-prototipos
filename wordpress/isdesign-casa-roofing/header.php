<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width,initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php if (cr('notice_on')) : ?>
<div class="concept"><?php echo cr_t('notice'); ?></div>
<?php endif; ?>

<header><div class="wrap nav">
 <a class="logo" href="#top" aria-label="<?php echo esc_attr(cr('biz_name')); ?>"><?php echo cr_img('logo', cr('biz_name')); ?></a>
 <nav aria-label="Main"><ul>
  <li><a href="#serv"><?php echo cr_t('nav_1'); ?></a></li>
  <li><a href="#why"><?php echo cr_t('nav_2'); ?></a></li>
  <li><a href="#rev"><?php echo cr_t('nav_3'); ?></a></li>
  <li><a href="#areas"><?php echo cr_t('nav_4'); ?></a></li>
  <li><a href="#contact"><?php echo cr_t('nav_5'); ?></a></li>
 </ul></nav>
 <div class="r"><span class="lic"><?php echo cr_t('license'); ?></span><a class="btn" href="<?php echo esc_attr(cr_tel()); ?>"><?php echo cr_t('phone'); ?></a></div>
</div></header>
