<?php
 use MediaWiki\User\UserOptionsLookup;
 use MediaWiki\MediaWikiServices;

/* Code From Universal Omega's Cosmos Skin */
class EvelutionSocialProfile {
	/**
	 * @param string $user
	 * @return User|null
	 */
	private static function getUser( $user ) {
		$services = MediaWikiServices::getInstance();

		$titleFactory = $services->getTitleFactory();
		$title = $titleFactory->newFromText( $user );

		if (
			is_object( $title ) &&
			( $title->getNamespace() == NS_USER || $title->getNamespace() == NS_USER_PROFILE ) &&
			!$title->isSubpage()
		) {
			$user = $title->getText();
		}

		$userFactory = $services->getUserFactory();
		$user = $userFactory->newFromName( $user );

		return $user;
	}
}


class SkinEvelution extends SkinMustache {
	public const TEMPLATE_DIR = __DIR__ . '/templates';
	
	/**
	 * @param BagOStuff $localServerObjectCache
	 * @param array $options
	 */
	public function __construct( BagOStuff $localServerObjectCache, array $options ) {
		$options['templateDirectory'] = self::TEMPLATE_DIR;
		parent::__construct( $options );

		$this->templateParser = new TemplateParser( $this->options['templateDirectory'], $localServerObjectCache );
	}

    /**
     * Extends the getTemplateData function to add a template key 'html-myskin-hello-world'
     * which can be rendered in skin.mustache using {{{html-myskin-hello-world}}
     */
    public function getTemplateData() {
        $data = parent::getTemplateData();
        $data["html-titlealt"] =  $this->getOutput()->getTitle(); // Page Title
        $data["html-articlecount"] = SiteStats::articles();
        $data["html-filecount"] = SiteStats::images();
        $data["html-editcount"] = SiteStats::edits();
        $data["html-usercount"] = SiteStats::users();
        $data["msg-evelution-pages"] = wfMessage( 'evelution-pages' )->numParams( SiteStats::articles() )->parse(); //Overwrite the message so it respects plural forms
        $data["msg-evelution-files"] = wfMessage( 'evelution-files' )->numParams( SiteStats::images() )->parse();
        $data["msg-evelution-edits"] = wfMessage( 'evelution-edits' )->numParams( SiteStats::edits() )->parse();
        $data["msg-evelution-users"] = wfMessage( 'evelution-users' )->numParams( SiteStats::users() )->parse();
        $data["msg-evelution-activity-module"] = wfMessage( 'evelution-activity-module' )->inContentLanguage()->parseAsBlock(); // Additional JS is used
        $data["msg-evelution-about-module-info"] = wfMessage( 'evelution-about-module-info' )->inContentLanguage()->parseAsBlock();
        $data["msg-evelution-discord-module-server-id"] = wfMessage( 'evelution-discord-module-server-id' )->inContentLanguage();
        $data["html-rc-link"] = SpecialPage::getTitleFor( 'Recentchanges' )->getLocalURL();
        $data["html-files-link"] = SpecialPage::getTitleFor( 'Newimages' )->getLocalURL();
        $data["html-css-link"] = Title::newFromText( 'MediaWiki:Evelution.css' )->getLocalURL();
        $data["html-css2-link"] = Title::newFromText( 'MediaWiki:Common.css' )->getLocalURL();
        $data["html-css3-link"] = Title::newFromText( 'MediaWiki:Mobile.css' )->getLocalURL();
        $data["html-js-link"] = Title::newFromText( 'MediaWiki:Evelution.js' )->getLocalURL();
        $data["html-js2-link"] = Title::newFromText( 'MediaWiki:Common.js' )->getLocalURL();
        $data["html-js3-link"] = Title::newFromText( 'MediaWiki:Mobile.js' )->getLocalURL();
        $data["html-spages-link"] = SpecialPage::getTitleFor( 'Specialpages' )->getLocalURL();
        $data["html-notices-link"] = SpecialPage::getTitleFor( 'Notifications' )->getLocalURL();
        $data["html-logs-link"] = SpecialPage::getTitleFor( 'Log' )->getLocalURL();
        $data["html-upload-link"] = SpecialPage::getTitleFor( 'Upload' )->getLocalURL();
        $data["html-rpage-link"] = SpecialPage::getTitleFor( 'Randompage' )->getLocalURL();
        $data["html-whatlinks-link"] = SpecialPage::getTitleFor( 'Whatlinkshere' )->getLocalURL();
        $data["html-info-link"] = SpecialPage::getTitleFor( 'PageInfo' )->getLocalURL();
        $data["html-history-link"] = SpecialPage::getTitleFor( 'PageHistory' )->getLocalURL();
        $data["html-mcontent-link"] = SpecialPage::getTitleFor( 'ChangeContentModel' )->getLocalURL();
        $data["html-edit-link"] = SpecialPage::getTitleFor( 'EditPage' )->getLocalURL();
        $data["html-longpages-link"] = SpecialPage::getTitleFor( 'Longpages' )->getLocalURL();
        $data["html-unusedtemplates-link"] = SpecialPage::getTitleFor( 'Unusedtemplates' )->getLocalURL();
        $data["html-apisandbox-link"] = SpecialPage::getTitleFor( 'ApiSandbox' )->getLocalURL();
        $data["html-messages-link"] = SpecialPage::getTitleFor( 'Allmessages' )->getLocalURL();
        $data["html-linkedactivity-link"] = SpecialPage::getTitleFor( 'Recentchangeslinked' )->getLocalURL();
        $data["html-export-link"] = SpecialPage::getTitleFor( 'Export' )->getLocalURL();
        $data["html-import-link"] = SpecialPage::getTitleFor( 'Import' )->getLocalURL();
        $data["html-stats-link"] = SpecialPage::getTitleFor( 'Statistics' )->getLocalURL();
        $data["html-allpages-link"] = SpecialPage::getTitleFor( 'Allpages' )->getLocalURL();
        $data["html-designer-link"] =  Title::newFromText( 'CPE ThemeDesigner' )->getLocalURL(); // SpecialPage::getTitleFor( 'CPEThemeDesigner' )->getLocalURL();
        $data["html-forum-link"] =  Title::newFromText( 'Forum:Index' )->getLocalURL(); // SpecialPage::getTitleFor( 'CPEThemeDesigner' )->getLocalURL();
        $data["html-purge-link"] = SpecialPage::getTitleFor( 'Purge' )->getLocalURL();
        if ( class_exists( 'wAvatar' ) ) {
			$avatar = new wAvatar( $this->getSkin()->getUser()
				->getId(), 'l' );
			$avatarElement = $avatar->getAvatarURL();
			$data["has-avatar"] = $this->getSkin()->getUser()->isRegistered();
		} else {
			$avatarElement = '<span class="cpe-icon material-icons">account_circle</span>';
			$data["has-avatar"] = false;
		}
		$data["html-avatar"] = $avatarElement;
		$data["html-sticky-rail"] = $this->getConfig()->get( 'EvelutionStickyRail' );
		$data["has-left-links"] = $this->getConfig()->get( 'EvelutionLeftPersonalLinks' );
		$blacklistedPages = $this->getConfig()->get( 'EvelutionDisableRightRailFromSpecificPages' );
		$data["has-disabled-rail"] = ($this->getConfig()->get( 'EvelutionDisableRightRail' ) || ($this->getOutput()->getTitle()->isMainPage()) || in_array( $this->getOutput()->getTitle()->getFullText(), $blacklistedPages ) );
		$data["has-server-mode"] = $this->getConfig()->get( 'EvelutionServerMode' );
		$data["has-no-color-management"] = $this->getConfig()->get( 'EvelutionDisableColorManagement' );
		$data["has-forced-full-width"] = $this->getConfig()->get ( 'EvelutionForceFullWidth' );
		$data["has-discord-id"] =  (wfMessage( 'evelution-discord-module-server-id' )->inContentLanguage() != '');
		$data["has-forum"] = ( defined( 'NS_FORUM' ) );
		$data["has-echo"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'Echo' )) && ($this->getSkin()->getUser()->isRegistered()) );
		$data["has-ivilution"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'Ivilution' )) );
		$data["has-smw"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'SemanticMediaWiki' )) );
		$data["has-mono-logo"] = $this->getConfig()->get ( 'EvelutionMonoLogo' );
		$data["has-interlanguage-links"] = true;
		$data["has-box-alias"] = $this->getConfig()->get ( 'EvelutionChangeMessageBoxesToBanners' );
		$data["has-classic-forced"] = $this->getConfig()->get ( 'EvelutionClassicDisabledColorManagement' );
		$data["is-loggedin"] = $this->getSkin()->getUser()->isRegistered();


		$data["has-servelution-3.3.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '3.3.0');
		$data["has-servelution-3.2.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '3.2.0');
		$data["has-servelution-3.1.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '3.1.0');
		$data["has-servelution-3.0.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '3.0.0');
		$data["has-servelution-2.8.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.8.0');
		$data["has-servelution-2.7.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.7.0');
		$data["has-servelution-2.6.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.6.0');
		$data["has-servelution-2.5.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.5.0');
		$data["has-servelution-2.4.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.4.0');
		$data["has-servelution-2.3.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.3.0');
		$data["has-servelution-2.2.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.2.0');
		$data["has-servelution-2.1.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.1.0');
		$data["has-servelution-2.0.0"] =  ($this->getConfig()->get ( 'EvelutionServelutionRelease' ) == '2.0.0');
		$data["has-servelution-unsupported"] =  ( in_array($this->getConfig()->get ( 'EvelutionServelutionRelease' ), ['1.0.0','1.1.0','1.2.0','1.3.0','1.4.0'] ) );
		// Outdated Servelution
		$data["has-servelution-old"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"] || $data["has-servelution-3.0.0"] || $data["has-servelution-3.1.0"] || $data["has-servelution-3.2.0"] || $data["has-servelution-3.1.0"] || $data["has-servelution-3.3.0"]);
		//  Generic Color Hue Shift
		$data["has-servelution-no-gchs"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"] || $data["has-servelution-3.0.0"] || $data["has-servelution-3.1.0"] || $data["has-servelution-3.2.0"] || $data["has-servelution-3.1.0"] || $data["has-servelution-3.3.0"]);

		// Custom Secondary Background and Text Color
		$data["has-servelution-no-custom-2ndbg"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"] || $data["has-servelution-3.0.0"] || $data["has-servelution-3.1.0"] || $data["has-servelution-3.2.0"]);
		// Mica/Luna Levit
		$data["has-servelution-no-mica"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"] || $data["has-servelution-3.0.0"] || $data["has-servelution-3.1.0"]);
		// Image Filter
		$data["has-servelution-no-imagefilter"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"] || $data["has-servelution-3.0.0"]);
		// Custom Primary Font
		$data["has-servelution-no-customfont"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"] || $data["has-servelution-2.8.0"]);
		// Custom Acryllic opacity
		$data["has-servelution-no-customacryllic"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"] || $data["has-servelution-2.7.0"]);
		// Luna Accent (Unfocus)
		$data["has-servelution-no-newluna"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"] || $data["has-servelution-2.6.0"]);
		// Luna Accent
		$data["has-servelution-no-accent"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"] || $data["has-servelution-2.5.0"]);
		// Dynamic Generic Colors
		$data["has-servelution-no-dgeneric"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"] || $data["has-servelution-2.4.0"]);
		// Floating Actions
		$data["has-servelution-no-actions"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"] || $data["has-servelution-2.3.0"]);
		// Custom Header Color
		$data["has-servelution-no-headertext"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"] || $data["has-servelution-2.2.0"]);
		// Dual Foreground Color
		$data["has-servelution-no-dground"] = ($data["has-servelution-2.0.0"] || $data["has-servelution-2.1.0"]);
		// Vanadium
		$data["has-servelution-vanadium"] = ($data["has-servelution-2.0.0"]);
		$data["has-disabled-dynamic-widgets"] = ($data["has-servelution-2.0.0"] || $this->getConfig()->get ( 'EvelutionDisableDynamicWidgets' ));
		/* Theming Stuff */
		$data["data-theme-A"] = $this->getConfig()->get ( 'EvelutionThemeA' );
		$data["data-theme-B"] = $this->getConfig()->get ( 'EvelutionThemeB' );
		$data["data-theme-C"] = $this->getConfig()->get ( 'EvelutionThemeC' );
		$data["data-theme-D"] = $this->getConfig()->get ( 'EvelutionThemeD' );
		$data["data-theme-E"] = $this->getConfig()->get ( 'EvelutionThemeE' );
		$data["data-theme-F"] = $this->getConfig()->get ( 'EvelutionThemeF' );
		$data["data-theme-G"] = $this->getConfig()->get ( 'EvelutionThemeG' );
		$data["data-theme-H"] = $this->getConfig()->get ( 'EvelutionThemeH' );
        return $data;
    }

}
