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
	 * @ngdoc function
	 * @name NextNotesApp.controller:NoteListCtrl
	 * @description
	 * # NoteListCtrl
	 * List Controller
	 */
	angular.module('NextNotesApp')
		.controller('NoteListCtrl', ['$scope', '$rootScope', '$location', 'NoteService', function ($scope, $rootScope, $location, NoteService) {
			$scope.editNote = function (note) {
				$location.path('/note/edit/' + note.id)
			};

			$scope.newNote = function (note) {
				$location.path('/note/new')
			};

			$scope.deleteNote = function (note) {
				NoteService.getNoteById(note.id).then(function (note) {
					note.$delete();
					delete $rootScope.notes[note.id];
				});
			};

			var init = function () {
				var locaList = $.map(angular.copy($rootScope.notes), function (value, index) {
					if (typeof value === 'object' && value.hasOwnProperty('id')) {
						return [value];
					}
				});
				$scope.localNoteList = locaList;
			};
			if ($rootScope.notes) {
				init();
			}

			$rootScope.$on('nextnotes_notes_loaded', function () {
				init();
			});

			$scope.changeOrder = function () {
				console.log('change order');
				vm.orderReverse = !vm.orderReverse;
				vm.items = $filter('orderBy')(vm.items, 'name', vm.orderReverse);
			};

		}]);

}());