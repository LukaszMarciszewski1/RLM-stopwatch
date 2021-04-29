/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a3a13540ae8a4c10c31a";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/app.js")(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-env browser */\n\n/*\n  eslint-disable\n  no-console,\n  func-names\n*/\nvar normalizeUrl = __webpack_require__(/*! ./normalize-url */ \"./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js\");\n\nvar srcByModuleId = Object.create(null);\nvar noDocument = typeof document === 'undefined';\nvar forEach = Array.prototype.forEach;\n\nfunction debounce(fn, time) {\n  var timeout = 0;\n  return function () {\n    var self = this; // eslint-disable-next-line prefer-rest-params\n\n    var args = arguments;\n\n    var functionCall = function functionCall() {\n      return fn.apply(self, args);\n    };\n\n    clearTimeout(timeout);\n    timeout = setTimeout(functionCall, time);\n  };\n}\n\nfunction noop() {}\n\nfunction getCurrentScriptUrl(moduleId) {\n  var src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src = document.currentScript.src;\n    } else {\n      var scripts = document.getElementsByTagName('script');\n      var lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n\n    srcByModuleId[moduleId] = src;\n  }\n\n  return function (fileMap) {\n    if (!src) {\n      return null;\n    }\n\n    var splitResult = src.split(/([^\\\\/]+)\\.js$/);\n    var filename = splitResult && splitResult[1];\n\n    if (!filename) {\n      return [src.replace('.js', '.css')];\n    }\n\n    if (!fileMap) {\n      return [src.replace('.js', '.css')];\n    }\n\n    return fileMap.split(',').map(function (mapRule) {\n      var reg = new RegExp(\"\".concat(filename, \"\\\\.js$\"), 'g');\n      return normalizeUrl(src.replace(reg, \"\".concat(mapRule.replace(/{fileName}/g, filename), \".css\")));\n    });\n  };\n}\n\nfunction updateCss(el, url) {\n  if (!url) {\n    if (!el.href) {\n      return;\n    } // eslint-disable-next-line\n\n\n    url = el.href.split('?')[0];\n  }\n\n  if (!isUrlRequest(url)) {\n    return;\n  }\n\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n\n  if (!url || !(url.indexOf('.css') > -1)) {\n    return;\n  } // eslint-disable-next-line no-param-reassign\n\n\n  el.visited = true;\n  var newEl = el.cloneNode();\n  newEl.isLoaded = false;\n  newEl.addEventListener('load', function () {\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener('error', function () {\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.href = \"\".concat(url, \"?\").concat(Date.now());\n\n  if (el.nextSibling) {\n    el.parentNode.insertBefore(newEl, el.nextSibling);\n  } else {\n    el.parentNode.appendChild(newEl);\n  }\n}\n\nfunction getReloadUrl(href, src) {\n  var ret; // eslint-disable-next-line no-param-reassign\n\n  href = normalizeUrl(href, {\n    stripWWW: false\n  }); // eslint-disable-next-line array-callback-return\n\n  src.some(function (url) {\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\nfunction reloadStyle(src) {\n  if (!src) {\n    return false;\n  }\n\n  var elements = document.querySelectorAll('link');\n  var loaded = false;\n  forEach.call(elements, function (el) {\n    if (!el.href) {\n      return;\n    }\n\n    var url = getReloadUrl(el.href, src);\n\n    if (!isUrlRequest(url)) {\n      return;\n    }\n\n    if (el.visited === true) {\n      return;\n    }\n\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n  return loaded;\n}\n\nfunction reloadAll() {\n  var elements = document.querySelectorAll('link');\n  forEach.call(elements, function (el) {\n    if (el.visited === true) {\n      return;\n    }\n\n    updateCss(el);\n  });\n}\n\nfunction isUrlRequest(url) {\n  // An URL is not an request if\n  // It is not http or https\n  if (!/^https?:/i.test(url)) {\n    return false;\n  }\n\n  return true;\n}\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    console.log('no window.document found, will not HMR CSS');\n    return noop;\n  }\n\n  var getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    var src = getScriptSrc(options.filename);\n    var reloaded = reloadStyle(src);\n\n    if (options.locals) {\n      console.log('[HMR] Detected local css modules. Reload all css');\n      reloadAll();\n      return;\n    }\n\n    if (reloaded) {\n      console.log('[HMR] css reload %s', src.join(' '));\n    } else {\n      console.log('[HMR] Reload all css');\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 50);\n};\n\n//# sourceURL=webpack:///./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-disable */\nfunction normalizeUrl(pathComponents) {\n  return pathComponents.reduce(function (accumulator, item) {\n    switch (item) {\n      case '..':\n        accumulator.pop();\n        break;\n\n      case '.':\n        break;\n\n      default:\n        accumulator.push(item);\n    }\n\n    return accumulator;\n  }, []).join('/');\n}\n\nmodule.exports = function (urlString) {\n  urlString = urlString.trim();\n\n  if (/^data:/i.test(urlString)) {\n    return urlString;\n  }\n\n  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';\n  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');\n  var host = components[0].toLowerCase().replace(/\\.$/, '');\n  components[0] = '';\n  var path = normalizeUrl(components);\n  return protocol + host + path;\n};\n\n//# sourceURL=webpack:///./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Race_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Race.js */ \"./src/js/modules/Race.js\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/style.scss */ \"./src/sass/style.scss\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    const race = new _modules_Race_js__WEBPACK_IMPORTED_MODULE_0__[\"Race\"]();\n});\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./src/js/modules/ActivePlayer.js":
/*!****************************************!*\
  !*** ./src/js/modules/ActivePlayer.js ***!
  \****************************************/
/*! exports provided: ActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActivePlayer\", function() { return ActivePlayer; });\nclass ActivePlayer {\n  constructor(playersList) {\n    this.playersList = playersList;\n    this.activeList = [];\n    this.activeContainer = document.querySelector('.active-player-name');\n    this.nextContainer = document.querySelector('.next-player-name');\n  }\n\n  //adding information about the player preparing to start\n  getPlayerPrepare(active) {\n    //index of array in this.playerList\n    const name = 0;\n    const status = 2;\n\n    if (active < this.playersList.length) {\n      const namePlayer = this.playersList[active].children[name];\n      const statusPlayer = this.playersList[active].children[status];\n\n      this.activeList.push(statusPlayer);\n      statusPlayer.classList.add('lamp--prepare');\n      setTimeout(() => {\n        this.activeContainer.textContent = namePlayer.textContent;\n      }, 1000);\n\n      if (active < this.playersList.length - 1) {\n        const nextNamePlayer = this.playersList[active].nextElementSibling.children[name];\n        setTimeout(() => {\n          this.nextContainer.textContent = nextNamePlayer.textContent;\n        }, 1000);\n      }\n\n      if (active === this.playersList.length - 1) {\n        this.nextContainer.textContent = '';\n      } else return;\n    } else if (active === this.playersList.length) {\n      setTimeout(() => {\n        this.activeContainer.textContent = '';\n      }, 1000);\n    } else return;\n  }\n\n  //information about the active player in green in the list of players\n  getPlayerActive() {\n    const active = this.activeList.find(el => el.classList.contains('lamp--prepare'));\n    if (active) {\n      active.classList.remove('lamp--prepare');\n      active.classList.add('lamp--active');\n    } else return;\n  }\n}\n\n//# sourceURL=webpack:///./src/js/modules/ActivePlayer.js?");

/***/ }),

/***/ "./src/js/modules/PlayerData.js":
/*!**************************************!*\
  !*** ./src/js/modules/PlayerData.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PlayerData; });\n//data for player to do list\nclass PlayerData {\n    constructor(name, number) {\n        this.name = name;\n        this.number = number;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/PlayerData.js?");

/***/ }),

/***/ "./src/js/modules/Players.js":
/*!***********************************!*\
  !*** ./src/js/modules/Players.js ***!
  \***********************************/
/*! exports provided: Players */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Players\", function() { return Players; });\n/* harmony import */ var _PlayerData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerData.js */ \"./src/js/modules/PlayerData.js\");\n\n\nclass Players {\n    constructor(playersList, containerList, inputLoad) {\n        this.playersList = playersList;\n        this.containerList = containerList;\n        this.inputLoad = inputLoad;\n        this.players = this.storeGetPlayer();\n    }\n\n    //display items in list\n    displayPlayer() {\n        this.players.forEach(player => this.addPlayerToList(player));\n    }\n\n    //add file Xlsx to list\n    loadPlayerList() {\n        let file = this.inputLoad.files[0];\n        readXlsxFile(file).then(data => {\n            const containerList = this.containerList;\n            const playersList = this.playersList;\n\n            data.map((row, index) => {\n                if (file) {\n                    const rows = document.createElement('div');\n                    rows.className = 'player-item';\n                    rows.innerHTML = `\n                   <h5>${row[0]}</h5>\n                   <p>${row[1]}</p>\n                   <div class=\"lamp\"></div>\n                   <ion-icon name=\"close-outline\" class=\"delete\"></ion-icon>\n                   `;\n                    const name = row[0]; //first row\n                    const number = row[1].toString(); //second row\n                    const playerDataLoadFile = new _PlayerData_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, number);\n\n                    //if the given competitor number is on the list\n                    for (const i in this.players) {\n                        if (number === this.players[i].number) {\n                            alert(`Zawodnik o numerze ${number} już istnieje`);\n                            return;\n                        }\n                    }\n                    playersList.push(rows);\n                    this.renderList();\n                    containerList.appendChild(rows);\n                    this.storeAddPlayer(playerDataLoadFile);\n                } else {\n                    return alert('dołącz plik');\n                }\n            });\n        }).catch(error => console.log(error));\n    }\n\n    //add item to list\n    addPlayerToList(player, inputNr) {\n        if (player) {\n            const containerList = this.containerList;\n            const row = document.createElement('div');\n            row.className = 'player-item';\n            row.innerHTML = `\n                           <h5>${player.name}</h5>\n                           <p>${player.number}</p>\n                           <div class=\"lamp\"></div>\n                           <ion-icon name=\"close-outline\" class=\"delete\"></ion-icon>\n                   `;\n\n            //if the given competitor number is on the list\n            for (const i in this.players) {\n                if (inputNr === this.players[i].number) {\n                    alert(`Zawodnik o numerze ${inputNr} już istnieje`);\n                    return;\n                }\n            }\n            this.playersList.push(row);\n            this.renderList();\n            containerList.appendChild(row);\n            this.clearFields();\n        }\n    }\n\n    //clear inputs\n    clearFields() {\n        document.getElementById('name-player').value = '';\n        document.getElementById('nr-player').value = '';\n    }\n\n    //set key data for player item\n    renderList() {\n        this.playersList.forEach((player, key) => {\n            player.dataset.key = key;\n            this.containerList.appendChild(player);\n        });\n    }\n\n    //remove item from list\n    deletePlayer(el) {\n        const index = el.parentElement.dataset.key;\n        if (el.classList.contains('delete')) {\n            el.parentElement.remove();\n            this.playersList.splice(index, 1);\n            this.renderList();\n        }\n    }\n\n    //clear list and local storage\n    clearList() {\n        if (this.playersList.length > 0) {\n            for (var player in localStorage) {\n                if (player == 'players') {\n                    localStorage.removeItem(player);\n                }\n            }\n            this.playersList.splice(0);\n            this.containerList.textContent = '';\n            this.players = [];\n        } else return;\n    }\n\n    //localStorage array\n    storeGetPlayer() {\n        let players;\n        if (localStorage.getItem('players') === null) {\n            players = [];\n        } else {\n            players = JSON.parse(localStorage.getItem('players'));\n        }\n        return players;\n    }\n\n    //add item to localStorage\n    storeAddPlayer(player, inputNr) {\n        if (player) {\n            for (const i in this.players) {\n                if (inputNr === this.players[i].number) return;\n            }\n            this.players.push(player);\n            localStorage.setItem('players', JSON.stringify(this.players));\n        }\n    }\n\n    //remove item from localStorage\n    storeRremovePlayer(el) {\n        const index = el.parentElement.dataset.key;\n        if (el.classList.contains('delete')) {\n            this.players.splice(index, 1);\n            localStorage.removeItem(index);\n        }\n        localStorage.setItem('players', JSON.stringify(this.players));\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Players.js?");

/***/ }),

/***/ "./src/js/modules/Race.js":
/*!********************************!*\
  !*** ./src/js/modules/Race.js ***!
  \********************************/
/*! exports provided: Race */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Race\", function() { return Race; });\n/* harmony import */ var _ActivePlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivePlayer.js */ \"./src/js/modules/ActivePlayer.js\");\n/* harmony import */ var _Time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Time.js */ \"./src/js/modules/Time.js\");\n/* harmony import */ var _Stopwatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stopwatch.js */ \"./src/js/modules/Stopwatch.js\");\n/* harmony import */ var _Settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings.js */ \"./src/js/modules/Settings.js\");\n/* harmony import */ var _Players_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Players.js */ \"./src/js/modules/Players.js\");\n/* harmony import */ var _PlayerData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PlayerData.js */ \"./src/js/modules/PlayerData.js\");\n/* harmony import */ var _Restart_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Restart.js */ \"./src/js/modules/Restart.js\");\n\n\n\n\n\n\n\n\nclass Race {\n    constructor() {\n        this.access = true;\n        this.startRaceAccess = false;\n        this.btnStart = document.querySelector('.start');\n        this.btnRestart = document.querySelector('.restart');\n        this.playersList = [...document.querySelectorAll('.player-item')];\n        this.containerList = document.querySelector('.list-container');\n        this.settingTime = document.getElementById(\"start-time\");\n        this.clock = document.querySelector('.clock h2');\n        this.countdownTime = document.querySelector('.countdown-time');\n        this.containerStartTime = document.querySelector('.select-time');\n        this.spanCircle = document.querySelector('.span-start');\n        this.settingsContainer = document.querySelector('.settings-modal');\n        this.infoPopup = document.querySelector('.info-popup');\n        this.acceptPopup = document.querySelector('.accept');\n        this.intervalTime = null;\n        this.btnOpenSettings = [...document.querySelectorAll('.open-settings-st')];\n        this.btnCloseSettings = [...document.querySelectorAll('.close-settings')];\n        this.btnFileLoad = document.querySelector('input[type=\"file\"]');\n        this.btnAddToList = document.querySelector('.add-to-list');\n        this.btnResetList = document.querySelector('.reset-list');\n        this.btnResetSettings = [...document.querySelectorAll('.reset-settings')];\n        this.playersPanelMobile = document.querySelector('.control-container');\n        this.blueColor = '#00d9f6';\n        this.fontColor = 'rgb(230, 230, 230)';\n        this.audio = new Audio('public/beep.mp3');\n        this.end = 'GO!';\n\n        this.settings = new _Settings_js__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"](\"interval-time\", this.countdownTime);\n        this.time = new _Time_js__WEBPACK_IMPORTED_MODULE_1__[\"Time\"](this.clock);\n        this.stopwatch = new _Stopwatch_js__WEBPACK_IMPORTED_MODULE_2__[\"Stopwatch\"](this.spanCircle, this.end, this.blueColor);\n        this.players = new _Players_js__WEBPACK_IMPORTED_MODULE_4__[\"Players\"](this.playersList, this.containerList, this.btnFileLoad);\n        this.activePlayer = new _ActivePlayer_js__WEBPACK_IMPORTED_MODULE_0__[\"ActivePlayer\"](this.playersList);\n        this.restart = new _Restart_js__WEBPACK_IMPORTED_MODULE_6__[\"Restart\"](this.btnStart, this.btnRestart);\n\n        //render setup\n        this.render();\n\n        //display btn start\n        this.restart.displayBtn(this.access);\n\n        //upgrade players\n        this.players.displayPlayer();\n\n        // loading the file with the list of players\n        this.btnFileLoad.addEventListener('change', () => this.players.loadPlayerList());\n\n        // Add player to list\n        document.querySelector('#to-do-player-list').addEventListener('submit', this.addPlayers.bind(this));\n\n        //clear list player\n        document.querySelector('#file-upload-form').addEventListener('reset', this.clearListPlayers.bind(this));\n\n        // remove player from list\n        this.removePlayer();\n\n        //Start race\n        this.btnStart.addEventListener('click', this.startRace.bind(this));\n\n        //open settings container\n        this.btnOpenSettings.forEach(open => open.addEventListener('click', () => this.settingsContainer.classList.add('display-container')));\n\n        //close settings container\n        this.btnCloseSettings.forEach(close => close.addEventListener('click', () => close.parentNode.classList.remove('display-container')));\n\n        //Restart race\n        this.btnRestart.addEventListener('click', e => {\n            e.preventDefault();\n            setTimeout(this.restart.changeBtn, 1000);\n            location.reload();\n        });\n\n        //reset btn\n        this.btnResetSettings.forEach(btn => btn.addEventListener('click', () => {\n            alert(\"Czy chcesz zresetować ustawienia ?\");\n            location.reload();\n        }));\n\n        //panelSettings mobile\n        document.querySelector('.mobile-player-lis').addEventListener('click', () => this.playersPanelMobile.classList.add('display-container'));\n\n        //accept popup info\n        this.acceptPopup.addEventListener('click', () => this.acceptPopup.parentNode.classList.remove('info-popup--active'));\n    }\n\n    //display of time, time interval and set start time\n    render() {\n        //clock and countdown to start\n        this.intervalTime = setInterval(() => {\n            this.time.getTime();\n            this.settings.countdownTime(this.settingTime);\n        }, 1000);\n\n        //setup circle interval time\n        this.stopwatch.timerSpan.textContent = this.settings.count();\n        document.getElementById('interval-time').addEventListener('change', () => {\n            this.stopwatch.timerSpan.textContent = this.settings.count();\n        });\n\n        //setup start time\n        this.containerStartTime.textContent = 'Ustaw godzinę startu';\n        document.getElementById('start-time').addEventListener('change', () => {\n            this.containerStartTime.textContent = this.settingTime.value.slice(11) + \":00\";\n            this.containerStartTime.classList.add('item-status-timer--big');\n        });\n    }\n\n    //adding players to the list and localstorage using this to do list\n    addPlayers(e) {\n        e.preventDefault();\n        const name = document.getElementById('name-player').value;\n        const number = document.getElementById('nr-player').value;\n        const player = new _PlayerData_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](name, number);\n\n        if (name === \"\" || number === \"\") return alert('uzupełnij pole');\n        if (number.length > 3) return alert('maxymalny numer zawodnika nie może być większy od 999');\n        if (name.length > 30) return alert('Imię i nazwisko nie może być dłuższe niż 30 znaków');\n        //if you can make changes\n        if (this.access) {\n            this.players.addPlayerToList(player, number);\n            this.players.storeAddPlayer(player, number);\n        };\n        //if no changes can be made, the race is on\n        if (!this.access) {\n            return alert('W trakcie wyścigu nie można dodawać zawodników do listy');\n        }\n    }\n\n    //pressing the clear button removes all players from the list\n    clearListPlayers() {\n        if (this.access && this.playersList.length > 0) {\n            if (confirm(\"Czy chcesz wyczyścić zapisane dane?\")) {\n                this.players.clearList();\n            }\n        } else throw new Error(\"Nie możesz czyścić listy w trakcie wyścigu\");\n    }\n\n    //pressing the delete button removes the player from the list\n    removePlayer() {\n        this.containerList.addEventListener('click', e => {\n            if (this.access) {\n                this.players.deletePlayer(e.target);\n                this.players.storeRremovePlayer(e.target);\n            } else {\n                e.target.classList.add('.active-race');\n                this.infoPopup.classList.add('info-popup--active');\n            }\n        });\n    }\n\n    //progress countdown for the active player\n    activeRace(interval) {\n        let active = 0;\n        active++;\n        //add preparation on the first player\n        this.activePlayer.getPlayerPrepare(active);\n        setInterval(() => {\n            active++;\n            this.activePlayer.getPlayerPrepare(active);\n            this.activePlayer.getPlayerActive();\n            this.stopwatch.stopTimer(active, this.playersList);\n        }, interval);\n    }\n\n    //starts the method when the start button is pressed\n    startRace() {\n        let active = 0;\n        let timeSet = this.settings.count();\n        let timeInterval = this.settings.count() * 1000;\n\n        if (this.settingTime.value === '') {\n            return alert('Wybierz godzinę startu');\n        }\n\n        if (timeSet >= this.settings.secondsToStart() || isNaN(this.settings.secondsToStart())) {\n            return alert('Odstep czasowy nie może być mniejszy niż pozostały czas do startu');\n        }\n\n        if (this.playersList.length >= 2) {\n            //parameters cannot be changed\n            this.access = false;\n            //after pressing start, add player preparation\n            this.activePlayer.getPlayerPrepare(active);\n            this.restart.displayBtn(this.access);\n            //add blockade on buttons if the race is on\n            this.btnOpenSettings.forEach(btn => btn.classList.add('inactive'));\n            this.btnAddToList.classList.add('inactive');\n            this.btnResetList.classList.add('inactive');\n            this.btnFileLoad.setAttribute(\"disabled\", true);\n            document.querySelectorAll('.inactive').forEach(btn => btn.setAttribute(\"disabled\", true));\n\n            const intTime = setInterval(() => {\n                //start the new time and stop the old one if the start button has been enabled\n                this.time.getTime();\n                clearInterval(this.intervalTime);\n            }, 1000);\n\n            const intCountdown = setInterval(() => {\n                this.settings.countdownTime(this.settingTime);\n            }, 1000);\n\n            const intBefore = setInterval(() => {\n                //the sound lasts 6 seconds + 1 seconds interval \n                if (this.stopwatch.timerSpan.textContent == 7) {\n                    this.audio.play();\n                };\n\n                //if the set interval is equal to the time to start, the circle function will be executed\n                if (this.settings.secondsToStart() === timeSet) {\n                    this.stopwatch.timerSpan.textContent = timeSet;\n                    this.stopwatch.startTimer(timeSet, timeInterval);\n                };\n\n                //if timerSpan = 5 seconds add color blue\n                if (this.stopwatch.timerSpan.textContent <= 6) {\n                    this.spanCircle.style.color = this.blueColor;\n                } else {\n                    this.spanCircle.style.color = this.fontColor;\n                };\n\n                this.stopwatch.changePrepareName();\n            }, 1000);\n\n            const int = setInterval(() => {\n                //if seconds in countdown timer = 0 start the race\n                if (this.settings.canStart() === 0) {\n                    //adding an active player on a previously started player\n                    this.activePlayer.getPlayerActive();\n                    //stopping interval to add an active player this.activeRace() method has its own interval\n                    clearInterval(int);\n                    this.activeRace(timeInterval);\n                    clearInterval(intCountdown);\n                }\n            }, 1000);\n\n            const clear = setInterval(() => {\n                if (this.spanCircle.textContent === this.end) {\n                    clearInterval(intBefore);\n                    clearInterval(clear);\n                }\n            }, 1000);\n        } else return alert('W wyścigu musi brać udział więcej niż jedna osoba');\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Race.js?");

/***/ }),

/***/ "./src/js/modules/Restart.js":
/*!***********************************!*\
  !*** ./src/js/modules/Restart.js ***!
  \***********************************/
/*! exports provided: Restart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Restart\", function() { return Restart; });\nclass Restart {\n    constructor(btnStart, btnRestart) {\n        this.btnStart = btnStart;\n        this.btnRestart = btnRestart;\n    }\n\n    //displaying the start or restart button\n    displayBtn(access) {\n        if (access) {\n            this.btnRestart.classList.add('restart-disable');\n            this.btnStart.classList.remove('start-disable');\n        } else {\n            this.btnRestart.classList.remove('restart-disable');\n            this.btnStart.classList.add('start-disable');\n        };\n    }\n\n    //after pressing the start button, restart is displayed\n    changeBtn() {\n        this.btnStart.classList.remove('start-disable');\n        this.btnRestart.classList.add('restart-disable');\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Restart.js?");

/***/ }),

/***/ "./src/js/modules/Settings.js":
/*!************************************!*\
  !*** ./src/js/modules/Settings.js ***!
  \************************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\nclass Settings {\n   //the interval is equal to the selector value\n   constructor(number, selectTime) {\n      this.number = number;\n      this.selectTime = selectTime;\n      this.access = null;\n      this.beforeBeginning = null;\n\n      this.count = () => {\n         //time interval setting\n         let count = parseInt(document.getElementById(this.number).value);\n         return count;\n      };\n   }\n\n   //timer counting down to start\n   countdownTime(deadlineTime) {\n      //deadline is the selected start time\n      let deadline = deadlineTime.value;\n      const endTime = new Date(deadline).getTime();\n      const nowTime = new Date().getTime();\n\n      let hours = Math.floor((endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);\n      let minutes = Math.floor((endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);\n      // (+1 bag) one second is faster\n      let seconds = Math.floor((endTime / 1000 - nowTime / 1000) % 60 + 1);\n      hours = hours < 10 ? `0${hours}` : hours;\n      minutes = minutes < 10 ? `0${minutes}` : minutes;\n      seconds = seconds < 10 ? `0${seconds}` : seconds;\n\n      //display countdown  \n      if (isNaN(endTime)) {\n         this.selectTime.style.display = 'none';\n      } else {\n         this.selectTime.style.display = 'inline';\n      };\n\n      //access can start, information whether the seconds are positive or negative in the countdown clock\n      this.access = Math.sign(seconds);\n      //sum of seconds remaining before start\n      this.beforeBeginning = hours * 60 * 60 + minutes * 60 + seconds;\n\n      if (this.access > 0) {\n         this.selectTime.textContent = `${hours}:${minutes}:${seconds}`;\n      } else {\n         this.selectTime.textContent = '00:00:00';\n      }\n   }\n\n   canStart() {\n      //access information from the countdownTime method\n      return this.access;\n   }\n   secondsToStart() {\n      //information about the total seconds to start from countdownTime method\n      return parseInt(this.beforeBeginning);\n   }\n\n}\n\n//# sourceURL=webpack:///./src/js/modules/Settings.js?");

/***/ }),

/***/ "./src/js/modules/Stopwatch.js":
/*!*************************************!*\
  !*** ./src/js/modules/Stopwatch.js ***!
  \*************************************/
/*! exports provided: Stopwatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Stopwatch\", function() { return Stopwatch; });\nclass Stopwatch {\n    constructor(timerSpan, end, blueColor) {\n        this.timerSpan = timerSpan;\n        this.circleAnimation;\n        this.stopwatchCounter;\n        this.access = true;\n        this.end = end;\n        this.blueColor = blueColor;\n    }\n\n    //circle stopwatch\n    startTimer(timeSet, timeInterval) {\n        let time = timeSet;\n        //progress animation with a time interval\n        const progressBar = new ProgressBar.Circle('#progress', {\n            color: this.blueColor,\n            strokeWidth: 5,\n            duration: timeInterval,\n            easing: 'linear'\n        });\n        progressBar.animate(1);\n\n        this.circleAnimation = setInterval(function () {\n            progressBar.set(0);\n            progressBar.animate(1);\n        }, timeInterval);\n\n        //countdown time interval in a circle\n        this.stopwatchCounter = setInterval(() => {\n            timeSet--;\n            this.timerSpan.textContent = timeSet;\n            if (timeSet === 1) timeSet += time;\n            if (timeSet === time) {\n                this.timerSpan.textContent = 'START';\n                this.timerSpan.classList.add('span-start--active');\n            } else {\n                this.timerSpan.classList.remove('span-start--active');\n            };\n        }, 1000);\n    }\n\n    //stop the progress and countdown animation in a circle\n    stopTimer(active, list) {\n        if (active === list.length) {\n            this.access = false;\n            clearInterval(this.circleAnimation);\n            setTimeout(() => {\n                clearInterval(this.stopwatchCounter);\n                this.timerSpan.textContent = this.end;\n            }, 1000);\n        }\n    }\n\n    //information about the active player and the next player and animation of loading in the container\n    changePrepareName() {\n        const loader = document.querySelector('.lds-ellipsis');\n        const activePlayerTxt = document.querySelector('.active-player-name');\n        //setInterval delay this.timerSpan.textContent === '1'\n        if (this.timerSpan.textContent === '1') {\n            loader.classList.remove('lds-ellipsis--active');\n            activePlayerTxt.classList.add('active-player-name--start');\n        } else {\n            activePlayerTxt.classList.remove('active-player-name--start');\n            loader.classList.add('lds-ellipsis--active');\n        };\n\n        if (this.timerSpan.textContent === this.end || this.access === false) {\n            activePlayerTxt.classList.remove('active-player-name--start');\n            loader.classList.remove('lds-ellipsis--active');\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Stopwatch.js?");

/***/ }),

/***/ "./src/js/modules/Time.js":
/*!********************************!*\
  !*** ./src/js/modules/Time.js ***!
  \********************************/
/*! exports provided: Time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return Time; });\nclass Time {\n    constructor(nowTime) {\n        this.nowTime = nowTime;\n        this.getTime = this.getTime.bind(this);\n    }\n\n    // time at the local clock\n    getTime() {\n        const time = new Date();\n        const seconds = time.getSeconds() < 10 ? \"0\" + time.getSeconds() : time.getSeconds();\n        const minutes = time.getMinutes() < 10 ? \"0\" + time.getMinutes() : time.getMinutes();\n        const hours = time.getHours() < 10 ? \"0\" + time.getHours() : time.getHours();\n        this.nowTime.textContent = `${hours}:${minutes}:${seconds}`;\n    }\n}\n\n//# sourceURL=webpack:///./src/js/modules/Time.js?");

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n    if(true) {\n      // 1619723976262\n      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ \"./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js\")(module.i, {\"locals\":false});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/sass/style.scss?");

/***/ })

/******/ });