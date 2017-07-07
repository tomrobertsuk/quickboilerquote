<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Quick_Boiler_Quote
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="container">
			<div class="footer-left">
				<?php dynamic_sidebar( 'footer-left' ); ?>
			</div>
			<div class="footer-right">
				<?php dynamic_sidebar( 'footer-right' ); ?>
			</div>
		</div>
		<div class="site-info">
			<div class="container">
				<nav role="navigation">
					<?php wp_nav_menu( array( 'theme_location' => 'footer', 'menu_id' => 'footer-nav' ) ); ?>
				</nav>
				<p>&copy; Geo Heating Ltd <?php echo date('Y'); ?></p>				
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
