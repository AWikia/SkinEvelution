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
        $data["msg-policy-link"] =  Title::newFromText( 'Project:Rules' )->getLocalURL();

		$data["html-revision"] = '0';
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
        $data["html-allmessages-link"] = SpecialPage::getTitleFor( 'Allmessages' )->getLocalURL();
        $data["html-linkedactivity-link"] = SpecialPage::getTitleFor( 'Recentchangeslinked' )->getLocalURL();
        $data["html-export-link"] = SpecialPage::getTitleFor( 'Export' )->getLocalURL();
        $data["html-import-link"] = SpecialPage::getTitleFor( 'Import' )->getLocalURL();
        $data["html-stats-link"] = SpecialPage::getTitleFor( 'Statistics' )->getLocalURL();
        $data["html-allpages-link"] = SpecialPage::getTitleFor( 'Allpages' )->getLocalURL();
        $data["html-designer-link"] =  Title::newFromText( 'CPE ThemeDesigner' )->getLocalURL(); // SpecialPage::getTitleFor( 'CPEThemeDesigner' )->getLocalURL();
        $data["html-plink-link"] = SpecialPage::getTitleFor( 'PermanentLink' )->getLocalURL();
        $data["html-forum-link"] =  Title::newFromText( 'Forum:Index' )->getLocalURL(); // SpecialPage::getTitleFor( 'CPEThemeDesigner' )->getLocalURL();
        $data["html-purge-link"] = SpecialPage::getTitleFor( 'Purge' )->getLocalURL();
        $data["html-mypage-link"] = SpecialPage::getTitleFor( 'MyPage' )->getLocalURL();
        $data["html-discord-link"] = Title::newFromText( 'Project:Discord' )->getLocalURL();
        $data["html-categories-link"] = SpecialPage::getTitleFor( 'Categories' )->getLocalURL();
        $data["html-drediercts-link"] = SpecialPage::getTitleFor( 'DoubleRedirects' )->getLocalURL();
        $data["html-sandbox-link"] = Title::newFromText( 'Project:Sandbox' )->getLocalURL();
        $data["html-af-link"] = SpecialPage::getTitleFor( 'AbuseFilter' )->getLocalURL();
        $data["html-chat-link"] = SpecialPage::getTitleFor( 'Chat' )->getLocalURL();
        $data["html-gadgets-link"] = SpecialPage::getTitleFor( 'Gadgets' )->getLocalURL();
        $data["html-translate-link"] = SpecialPage::getTitleFor( 'Translate' )->getLocalURL();
        $data["html-cpage-link"] = SpecialPage::getTitleFor( 'CreatePage' )->getLocalURL();
        $data["html-contact-link"] = SpecialPage::getTitleFor( 'Contact' )->getLocalURL();

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
		$data["has-css"] = $this->getConfig()->get( 'AllowUserCss' );
		$data["has-js"] = $this->getConfig()->get( 'AllowUserJs' );
		$data["has-mf"] = (ExtensionRegistry::getInstance()->isLoaded( 'MobileFrontend' ));
		$data["is-loggedin"] = $this->getSkin()->getUser()->isRegistered();
		$data["is-outdated"] = ( version_compare( MW_VERSION, '1.37', '<' ) );

		$data["has-disabled-dynamic-widgets"] = $this->getConfig()->get ( 'EvelutionDisableDynamicWidgets' );

		$data["has-af"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'AbuseFilter' )) );
		$data["has-chat"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'MediaWikiChat' )) );
		$data["has-gadgets"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'Gadgets' )) );
		$data["has-translate"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'Translate' )) );
		$data["has-cpage"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'CreateAPage' )) );
		$data["has-contact"] = ( (ExtensionRegistry::getInstance()->isLoaded( 'ContactPage' )) );

		/* Theming Stuff */
		$data["data-theme-A"] = $this->getConfig()->get ( 'EvelutionThemeA' );
		$data["data-theme-B"] = $this->getConfig()->get ( 'EvelutionThemeB' );
		$data["data-theme-C"] = $this->getConfig()->get ( 'EvelutionThemeC' );
		$data["data-theme-D"] = $this->getConfig()->get ( 'EvelutionThemeD' );
		$data["data-theme-E"] = $this->getConfig()->get ( 'EvelutionThemeE' );
		$data["data-theme-F"] = $this->getConfig()->get ( 'EvelutionThemeF' );
		$data["data-theme-G"] = $this->getConfig()->get ( 'EvelutionThemeG' );
		$data["data-theme-H"] = $this->getConfig()->get ( 'EvelutionThemeH' );
		$data["data-theme-H"] = $this->getConfig()->get ( 'EvelutionThemeH' );
		$data["data-dcmmode-1"] = $this->getConfig()->get ( 'EvelutionCustomDCMMode1' );
		$data["data-dcmmode-2"] = $this->getConfig()->get ( 'EvelutionCustomDCMMode2' );
		$data["data-dcmmode-3"] = $this->getConfig()->get ( 'EvelutionCustomDCMMode3' );
		$data["data-dcmmode-4"] = $this->getConfig()->get ( 'EvelutionCustomDCMMode4' );

		$data["html-testing"] = $this->getConfig()->get ( 'ScriptPath' );
        return $data;
    }

}
