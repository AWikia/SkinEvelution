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
        $data["html-rc-link"] = SpecialPage::getTitleFor( 'Recentchanges' )->getLocalURL();
        $data["html-files-link"] = SpecialPage::getTitleFor( 'NewFiles' )->getLocalURL();
        $data["html-css-link"] = Title::newFromText( 'MediaWiki:Evelution.css' )->getLocalURL();
        $data["html-js-link"] = Title::newFromText( 'MediaWiki:Evelution.js' )->getLocalURL();
        $data["html-spages-link"] = SpecialPage::getTitleFor( 'Specialpages' )->getLocalURL();
        $data["html-notices-link"] = SpecialPage::getTitleFor( 'Notifications' )->getLocalURL();
        $data["html-logs-link"] = SpecialPage::getTitleFor( 'Log' )->getLocalURL();
        $data["html-upload-link"] = SpecialPage::getTitleFor( 'Upload' )->getLocalURL();
        $data["html-rpage-link"] = SpecialPage::getTitleFor( 'Randompage' )->getLocalURL();
        $data["html-whatlinks-link"] = SpecialPage::getTitleFor( 'Whatlinkshere' )->getLocalURL();
        $data["html-info-link"] = SpecialPage::getTitleFor( 'Pageinfo' )->getLocalURL();
        $data["html-history-link"] = SpecialPage::getTitleFor( 'Pagehistory' )->getLocalURL();
        $data["html-mcontent-link"] = SpecialPage::getTitleFor( 'Changecontentmodel' )->getLocalURL();
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
        return $data;
    }
	/**
	 * @inheritDoc
	 * @return array
	 */
	protected function getJsConfigVars(): array {
		return array_merge( parent::getJsConfigVars(), [
			'wgEvelution' => [
				'LeftPersonalLinks' => $this->getConfig()->get( 'EvelutionLeftPersonalLinks' ),
				'DisableColorManagement' => $this->getConfig()->get( 'EvelutionDisableColorManagement' ),
				'ForceOneHeader' => $this->getConfig()->get( 'EvelutionForceOneHeader' ),
				'DisableRightRail' => $this->getConfig()->get( 'EvelutionDisableRightRail' ),
				'ServerMode' => $this->getConfig()->get( 'EvelutionServerMode' ),
				'CustomFont' => $this->getConfig()->get( 'EvelutionCustomFont' ),
				'StickyRail' => $this->getConfig()->get( 'EvelutionStickyRail' ),
				'Designer' => $this->getConfig()->get( 'EvelutionDesigner' ),
			]
		] );
	}
}