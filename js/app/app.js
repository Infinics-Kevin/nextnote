/**
 * Nextcloud - NextNotes
 *
 * @copyright Copyright (c) 2016, Sander Brand (brantje@gmail.com)
 * @copyright Copyright (c) 2016, Marcos Zuriaga Miguel (wolfi@wolfi.es)
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

(function () {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name passmanApp
	 * @description
	 * # passmanApp
	 *
	 * Main module of the application.
	 */
	angular
		.module('NextNotesApp', [
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ngRoute',
			'ngSanitize',
			'ngTouch',
			'templates-main',
			'ui.tinymce'
		])
		.config(['$httpProvider', function ($httpProvider) {
		/** global: oc_requesttoken */
		$httpProvider.defaults.headers.common.requesttoken = oc_requesttoken;
	}]).config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]).run(['$rootScope', 'NoteFactory', function ($rootScope, NoteFactory) {
		console.log('App loaded');
		NoteFactory.query(function (notes) {
			console.log('Notes received', notes);
			$rootScope.notes = notes;

			$rootScope.list_sorting = {
				what: 'title',
				order: 'desc'
			};
			$rootScope.$broadcast('nextnotes_notes_loaded');
		});
	}]);
}());