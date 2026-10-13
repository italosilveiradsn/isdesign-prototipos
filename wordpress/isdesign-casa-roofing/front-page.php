<?php get_header(); ?>

<main class="wrap" id="top">
 <section class="bento" aria-label="Introduction">
  <div class="t navy h1">
   <span class="lab" style="color:var(--pur2);position:relative"><?php echo cr_t('hero_kicker'); ?></span>
   <h1 class="d"><?php echo cr_t('hero_h1a'); ?> <em><?php echo cr_t('hero_h1b'); ?></em></h1>
   <div class="low"><p><?php echo cr_t('hero_text'); ?></p><div class="cta"><a class="btn" href="#contact"><?php echo cr_t('hero_btn1'); ?></a><a class="btn o" href="<?php echo esc_attr(cr_tel()); ?>"><?php echo cr_t('hero_btn2'); ?></a></div></div>
  </div>
  <div class="t photo h2t"><?php echo cr_img('hero_photo', cr('hero_photo_alt'), ' fetchpriority="high" style="object-position:30% 50%"'); ?><div class="badge"><?php echo cr_t('hero_badge1'); ?><br><span style="font-weight:600;opacity:.85"><?php echo cr_t('hero_badge2'); ?></span></div></div>
  <div class="t sun h3t"><span class="lab"><?php echo cr_t('rate_label'); ?></span><b><?php echo cr_t('rate_num'); ?><br><span class="stars" style="color:var(--navy2);font-size:1.2rem">★★★★★</span></b><span style="font-weight:700;font-size:.9rem"><?php echo cr_t('rate_src'); ?></span></div>
  <div class="t lil h4t"><span class="lab" style="color:var(--mut)"><?php echo cr_t('lic_label'); ?></span><b><?php echo cr_ml('lic_num'); ?></b></div>
 </section>

 <section class="sec" id="serv">
  <div class="sh rv"><h2 class="d"><?php echo cr_ml('serv_h'); ?></h2><p><?php echo cr_t('serv_p'); ?></p></div>
  <div class="bento">
   <?php foreach ([1, 2, 3] as $n) : ?>
   <div class="t photo navy s-big rv"><?php echo cr_img("s{$n}_i", cr("s{$n}_t"), ' loading="lazy"'); ?><div class="in"><h3><?php echo cr_t("s{$n}_t"); ?></h3><p><?php echo cr_t("s{$n}_p"); ?></p></div></div>
   <?php endforeach; ?>
   <div class="chips rv"><?php foreach (array_filter(array_map('trim', explode("\n", cr('chips')))) as $chip) { echo '<span>' . esc_html($chip) . '</span>'; } ?></div>
  </div>
 </section>

 <section class="sec" id="why">
  <div class="bento">
   <div class="t navy w1 rv"><div><span class="lab" style="color:var(--pur2)"><?php echo cr_t('why_label'); ?></span><h2 style="margin-top:14px"><?php echo cr_t('why_h'); ?></h2></div><p><?php echo cr_t('why_p'); ?></p></div>
   <div class="t wh w2 rv"><span class="lab" style="color:var(--pur)"><?php echo cr_t('safe_label'); ?></span><ul><li><?php echo cr_t('safe_1'); ?></li><li><?php echo cr_t('safe_2'); ?></li><li><?php echo cr_t('safe_3'); ?></li></ul></div>
   <div class="t lil w3 rv"><h3><?php echo cr_t('fin_h'); ?></h3><small><?php echo cr_t('fin_p'); ?></small><div class="gs"><?php echo cr_img('fin_i1', cr('fin_h'), ' loading="lazy"'); ?></div><div class="gs"><?php echo cr_img('fin_i2', cr('fin_h'), ' loading="lazy"'); ?></div></div>
  </div>
 </section>

 <section class="sec" id="rev">
  <div class="sh rv"><h2 class="d"><?php echo cr_ml('rev_h'); ?></h2><p><?php echo cr_t('rev_p'); ?></p></div>
  <div class="bento">
   <div class="t pur r1 rv"><blockquote>&ldquo;<?php echo cr_t('q1_t'); ?>&rdquo;</blockquote><cite><?php echo cr_t('q1_a'); ?></cite></div>
   <div class="t lil r2 rv"><blockquote>&ldquo;<?php echo cr_t('q2_t'); ?>&rdquo;</blockquote><cite><?php echo cr_t('q2_a'); ?></cite></div>
   <div class="t wh r2 rv"><blockquote>&ldquo;<?php echo cr_t('q3_t'); ?>&rdquo;</blockquote><cite><?php echo cr_t('q3_a'); ?></cite></div>
   <div class="t navy r1 rv" style="grid-column:span 12;min-height:0"><blockquote style="font-size:clamp(1.2rem,2vw,1.7rem)">&ldquo;<?php echo cr_t('q4_t'); ?>&rdquo;</blockquote><cite><?php echo cr_t('q4_a'); ?></cite></div>
   <div class="t wh pt rv"><p class="lab"><?php echo cr_t('brands_label'); ?></p>
    <?php
    $brands = ['b1' => 'Malarkey Roofing Products', 'b2' => 'Eagle Roofing Products', 'b3' => 'GAF Materials Corporation', 'b4' => 'Owens Corning', 'b5' => 'Polyglass', 'b6' => 'Westlake Royal Roofing', 'b7' => 'Google reviews', 'b8' => 'Angi'];
    foreach ($brands as $id => $alt) {
        $extra = ' loading="lazy"';
        if ($id === 'b5' || $id === 'b6') { $extra = ' class="wide" loading="lazy"'; }
        if ($id === 'b8') { $extra .= ' style="height:46px"'; }
        echo cr_img($id, $alt, $extra);
    }
    ?>
   </div>
  </div>
 </section>

 <section class="sec" id="areas" style="padding-bottom:0">
  <div class="bento">
   <div class="t navy a1 rv"><span class="lab" style="color:var(--pur2)"><?php echo cr_t('areas_label'); ?></span><h2 style="margin-top:12px"><?php echo cr_t('areas_h'); ?></h2><ul class="cty">
    <?php foreach ([1, 2, 3, 4, 5] as $n) : if (trim(cr("a{$n}_c")) === '') { continue; } ?>
    <li><?php echo cr_t("a{$n}_c"); ?> <span><?php echo cr_t("a{$n}_t"); ?></span></li>
    <?php endforeach; ?>
   </ul></div>
   <div class="t pur c1 rv" id="contact">
    <div><span class="lab" style="color:var(--pur2)"><?php echo cr_t('ct_label'); ?></span><h2 class="d" style="margin-top:12px"><?php echo cr_t('ct_h'); ?></h2><a class="num" href="<?php echo esc_attr(cr_tel()); ?>"><?php echo cr_t('phone'); ?></a><span style="opacity:.9"><?php echo cr_t('ct_note'); ?></span>
     <dl><dt>Email</dt><dd><a href="mailto:<?php echo esc_attr(antispambot(cr('email'))); ?>"><?php echo esc_html(antispambot(cr('email'))); ?></a></dd><dt>Business hours</dt><dd><?php echo cr_ml('hours'); ?></dd><dt>License</dt><dd><?php echo cr_t('lic_num') ? esc_html(str_replace("\n", '', cr('lic_num'))) : ''; ?></dd></dl></div>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
     <input type="hidden" name="action" value="cr_contact">
     <?php wp_nonce_field('cr_contact', 'cr_nonce'); ?>
     <input type="text" name="cr_website" value="" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;width:0;padding:0">
     <input type="text" name="cr_name" placeholder="Full name" aria-label="Full name" required>
     <input type="email" name="cr_email" placeholder="Email address" aria-label="Email">
     <input type="tel" name="cr_phone" placeholder="Phone number" aria-label="Phone">
     <textarea name="cr_msg" rows="3" placeholder="Add a message..." aria-label="Message"></textarea>
     <button class="btn w" type="submit" style="justify-content:center"><?php echo cr_t('form_btn'); ?></button>
     <small><?php
      $sent = isset($_GET['sent']) ? sanitize_text_field(wp_unslash($_GET['sent'])) : '';
      if ($sent === '1') { echo 'Thank you! We received your message.'; }
      elseif ($sent === '0') { echo 'Please add your name and an email or phone number, then try again.'; }
     ?></small>
    </form>
   </div>
  </div>
 </section>
</main>

<?php get_footer(); ?>
