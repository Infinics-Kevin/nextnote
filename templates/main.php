<?php
/**
 * Nextcloud - ownnote
 *
 * @copyright Copyright (c) 2015, Ben Curtis <ownclouddev@nosolutions.com>
 * @copyright Copyright (c) 2017, Sander Brand (brantje@gmail.com)
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
/*build-js-start*/
script('ownnote', 'vendor/tinymce/tinymce.min');
script('ownnote', 'vendor/angular/angular.min');
script('ownnote', 'vendor/angular-animate/angular-animate');
script('ownnote', 'vendor/angular-cookies/angular-cookies');
script('ownnote', 'vendor/angular-resource/angular-resource');
script('ownnote', 'vendor/angular-route/angular-route');
script('ownnote', 'vendor/angular-sanitize/angular-sanitize');
script('ownnote', 'vendor/angular-touch/angular-touch');
script('ownnote', 'vendor/angular-tinymce/angular-tinymce');
script('ownnote', 'vendor/angular-timeago/angular-timeago-core');
script('ownnote', 'vendor/angular-timeago/angular-timeago');

script('ownnote', 'app/app');
script('ownnote', 'app/routes');
script('ownnote', 'templates');
script('ownnote', 'app/controllers/MainCtrl');
script('ownnote', 'app/controllers/NoteListCtrl');
script('ownnote', 'app/controllers/NoteEditCtrl');
script('ownnote', 'app/services/NoteService');
script('ownnote', 'app/factory/NoteFactory');
/*build-js-end*/


/*
 * Styles
 */
//Core
\OCP\Util::addStyle('core', 'icons');


/*build-css-start*/
style('ownnote', 'app');
/*build-css-end*/
//$sharemode = \OCP\Config::getAppValue('ownnote', 'sharemode', 'merge');
//echo '<script nonce="2726c7f26c"> var shareMode = "'. $shareMode .'"</script>';
?>
<input type="hidden" name="nextNonce" id="nextNonce" value="<?php p(\OC::$server->getContentSecurityPolicyNonceManager()->getNonce()) ?>" />
<div id="app" ng-app="NextNotesApp" ng-controller="MainCtrl">
	<div id="app-navigation">
		<ul id="grouplist">
			<!--<li class="group" data-type="all">
				<a class="name"	 title="Shared with you">Shared	with you</a>
				<span class="utils">
					<span  class="action numnotes">0</span>
				</span>
			</li>
			<li class="group" data-type="all">
				<a class="name"	 title="Shared with others">Shared with others</a>
				<span class="utils">
					<span  class="action numnotes">0</span>
				</span>
			</li> -->

			<li class="group active" data-type="all"><a class="name"
														id="link-All"
														role="button"
														title="All">All</a>
				<span class="utils">
					<a class="icon-rename action edit tooltipped rightwards" group="All" original-title=""></a>
					<a class="icon-delete action delete tooltipped rightwards" group="All" original-title=""></a>
					<span class="action numnotes" ng-show="keys(notes).length - 2 > 0">{{ keys(notes).length - 2 }}</span>
				</span>
			</li>
		</ul>
	</div>

	<div id="app-content">
		<div id="app-navigation-toggle" class="icon-menu" style="display:none;"></div>
		<ng-view></ng-view>
	</div>
</div>
