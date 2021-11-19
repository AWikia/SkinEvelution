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
        $data["html-js-link"] = Title::newFromText( 'MediaWiki:Evelution.js' )->getLocalURL();
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
        if ( class_exists( 'wAvatar' ) ) {
			$avatar = new wAvatar( $this->getSkin()->getUser()
				->getId(), 'l' );
			$avatarElement = $avatar->getAvatarURL();
		} else {
			$avatarElement = '<span class="cpe-icon material-icons">account_circle</span>';
		}
		$data["html-avatar"] = $avatarElement;
		$data["html-sticky-rail"] = $this->getConfig()->get( 'EvelutionStickyRail' );
		$data["has-left-links"] = $this->getConfig()->get( 'EvelutionLeftPersonalLinks' );
		$blacklistedPages = $this->getConfig()->get( 'EvelutionDisableRightRailFromSpecificPages' );
		$data["has-disabled-rail"] = ($this->getConfig()->get( 'EvelutionDisableRightRail' ) || ($this->getOutput()->getTitle()->isMainPage()) || in_array( $this->getOutput()->getTitle()->getFullText(), $blacklistedPages ) );
		$data["has-single-header"] = $this->getConfig()->get( 'EvelutionForceOneHeader' );
		$data["has-server-mode"] = $this->getConfig()->get( 'EvelutionServerMode' );
		$data["html-custom-fontoo"] = $this->getConfig()->get( 'EvelutionCustomFont' );
		$data["has-custom-font"] = ($this->getConfig()->get( 'EvelutionCustomFont' ) != "" );
		$data["has-no-color-management"] = $this->getConfig()->get( 'EvelutionDisableColorManagement' );
		$data["has-forced-full-width"] = $this->getConfig()->get ( 'EvelutionForceFullWidth' );
		$data["has-discord-id"] =  (wfMessage( 'evelution-discord-module-server-id' )->inContentLanguage() != '');
        return $data;
    }

}
