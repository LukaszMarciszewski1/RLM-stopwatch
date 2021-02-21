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
/******/ 	var hotCurrentHash = "a66028f562c72fb9aa21";
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
/******/ 	return hotCreateRequire("./js/app.js")(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ \"./sass/style.scss\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_Start_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Start.js */ \"./js/modules/Start.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const start = new _modules_Start_js__WEBPACK_IMPORTED_MODULE_1__[\"Start\"]();\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/modules/ActivePlayer.js":
/*!************************************!*\
  !*** ./js/modules/ActivePlayer.js ***!
  \************************************/
/*! exports provided: ActivePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ActivePlayer\", function() { return ActivePlayer; });\nclass ActivePlayer {\n  constructor(playersList) {\n    this.playersList = playersList;\n    this.activeList = [];\n    this.activeContainer = document.querySelector('.active-player-name');\n    this.nextContainer = document.querySelector('.next-player-name');\n  }\n  getPlayerPrepare(active) {\n    //index of array in this.playerList\n    const name = 0;\n    const status = 2;\n\n    if (active < this.playersList.length) {\n      const namePlayer = this.playersList[active].children[name];\n      const statusPlayer = this.playersList[active].children[status];\n\n      this.activeList.push(statusPlayer);\n      statusPlayer.classList.add('lamp--prepare');\n      setTimeout(() => {\n        this.activeContainer.textContent = namePlayer.textContent;\n      }, 1000);\n\n      if (active < this.playersList.length - 1) {\n        const nextNamePlayer = this.playersList[active].nextElementSibling.children[name];\n        setTimeout(() => {\n          this.nextContainer.textContent = nextNamePlayer.textContent;\n        }, 1000);\n      }\n      if (active === this.playersList.length - 1) {\n        this.nextContainer.textContent = '';\n      } else return;\n    } else if (active === this.playersList.length) {\n      setTimeout(() => {\n        this.activeContainer.textContent = '';\n      }, 1000);\n    } else return;\n  }\n  getPlayerActive() {\n    const active = this.activeList.find(el => el.classList.contains('lamp--prepare'));\n    if (active) {\n      active.classList.remove('lamp--prepare');\n      active.classList.add('lamp--active');\n    } else return;\n  }\n}\n\n//# sourceURL=webpack:///./js/modules/ActivePlayer.js?");

/***/ }),

/***/ "./js/modules/PlayerData.js":
/*!**********************************!*\
  !*** ./js/modules/PlayerData.js ***!
  \**********************************/
/*! exports provided: PlayerData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayerData\", function() { return PlayerData; });\nclass PlayerData {\n    constructor(name, number) {\n        this.name = name;\n        this.number = number;\n    }\n}\n\n//# sourceURL=webpack:///./js/modules/PlayerData.js?");

/***/ }),

/***/ "./js/modules/PlayerDataLoadFile.js":
/*!******************************************!*\
  !*** ./js/modules/PlayerDataLoadFile.js ***!
  \******************************************/
/*! exports provided: PlayerDataLoadFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayerDataLoadFile\", function() { return PlayerDataLoadFile; });\nclass PlayerDataLoadFile {\n    constructor(name, number) {\n        this.name = name;\n        this.number = number;\n    }\n}\n\n//# sourceURL=webpack:///./js/modules/PlayerDataLoadFile.js?");

/***/ }),

/***/ "./js/modules/Players.js":
/*!*******************************!*\
  !*** ./js/modules/Players.js ***!
  \*******************************/
/*! exports provided: Players */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Players\", function() { return Players; });\n/* harmony import */ var _PlayerDataLoadFile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerDataLoadFile.js */ \"./js/modules/PlayerDataLoadFile.js\");\n\nclass Players {\n    constructor(playersList, containerList, inputLoad) {\n        this.playersList = playersList;\n        this.containerList = containerList;\n        this.inputLoad = inputLoad;\n        this.PlayerDataLoadFile = null;\n    }\n\n    displayPlayer() {\n        const players = this.storeGetPlayer();\n        players.forEach(player => this.addPlayerToList(player));\n    }\n\n    //load player list xlsx file\n    loadPlayerList() {\n        let file = this.inputLoad.files[0];\n        readXlsxFile(file).then(data => {\n            const containerList = this.containerList;\n            const playersList = this.playersList;\n\n            data.map((row, index) => {\n                if (file) {\n                    const rows = document.createElement('div');\n                    rows.className = 'player-item';\n                    rows.innerHTML = `\n                   <h5>${row[0]}</h5>\n                   <p>${row[1]}</p>\n                   <div class=\"lamp\"></div>\n                   <ion-icon name=\"close-outline\" class=\"delete\"></ion-icon>\n                   `;\n                    const name = row[0];\n                    const number = row[1].toString();\n                    this.PlayerDataLoadFile = new _PlayerDataLoadFile_js__WEBPACK_IMPORTED_MODULE_0__[\"PlayerDataLoadFile\"](name, number);\n\n                    playersList.push(rows);\n                    this.renderList();\n                    containerList.appendChild(rows);\n                    this.storeAddPlayer(this.PlayerDataLoadFile);\n                } else {\n                    return alert('dołącz plik');\n                }\n            });\n        }).catch(error => console.log(error));\n    }\n\n    addPlayerToList(player) {\n        const containerList = this.containerList;\n        const row = document.createElement('div');\n        row.className = 'player-item';\n        row.innerHTML = `\n                   <h5>${player.name}</h5>\n                   <p>${player.number}</p>\n                   <div class=\"lamp\"></div>\n                   <ion-icon name=\"close-outline\" class=\"delete\"></ion-icon>\n           `;\n\n        this.playersList.push(row);\n        this.renderList();\n        containerList.appendChild(row);\n        this.clearFields();\n    }\n\n    clearFields() {\n        document.getElementById('name-player').value = '';\n        document.getElementById('nr-player').value = '';\n    }\n\n    renderList() {\n        this.playersList.forEach((player, key) => {\n            player.dataset.key = key;\n            this.containerList.appendChild(player);\n        });\n    }\n\n    deletePlayer(el) {\n        const index = el.parentElement.dataset.key;\n        if (el.classList.contains('delete')) {\n            el.parentElement.remove();\n            this.playersList.splice(index, 1);\n            this.renderList();\n        }\n    }\n\n    clearList(containerList) {\n        if (this.playersList.length > 0) {\n            localStorage.clear();\n            this.playersList = [];\n            containerList.textContent = '';\n        } else return;\n    }\n\n    //localStorage\n    storeGetPlayer() {\n        let players;\n        if (localStorage.getItem('players') === null) {\n            players = [];\n        } else {\n            players = JSON.parse(localStorage.getItem('players'));\n        }\n        return players;\n    }\n\n    storeAddPlayer(player) {\n        const players = this.storeGetPlayer();\n        players.push(player);\n        localStorage.setItem('players', JSON.stringify(players));\n    }\n\n    storeRremovePlayer(el) {\n        const players = this.storeGetPlayer();\n        const index = el.parentElement.dataset.key;\n        if (el.classList.contains('delete')) {\n            players.splice(index, 1);\n        }\n        localStorage.setItem('players', JSON.stringify(players));\n    }\n}\n\n//# sourceURL=webpack:///./js/modules/Players.js?");

/***/ }),

/***/ "./js/modules/Restart.js":
/*!*******************************!*\
  !*** ./js/modules/Restart.js ***!
  \*******************************/
/*! exports provided: Restart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Restart\", function() { return Restart; });\nclass Restart {\n    constructor(btnStart, btnRestart) {\n        this.btnStart = btnStart;\n        this.btnRestart = btnRestart;\n    }\n    displayBtn(access) {\n        if (access) {\n            this.btnRestart.classList.add('restart-disable');\n            this.btnStart.classList.remove('start-disable');\n        } else {\n            this.btnRestart.classList.remove('restart-disable');\n            this.btnStart.classList.add('start-disable');\n        }\n    }\n    changeBtn() {\n        this.btnStart.classList.remove('start-disable');\n        this.btnRestart.classList.add('restart-disable');\n    }\n}\n\n//# sourceURL=webpack:///./js/modules/Restart.js?");

/***/ }),

/***/ "./js/modules/Settings.js":
/*!********************************!*\
  !*** ./js/modules/Settings.js ***!
  \********************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\nclass Settings {\n   //the interval is equal to the selector value\n   constructor(number, selectTime) {\n      this.number = number;\n      this.selectTime = selectTime;\n      this.access = null;\n      this.beforeBeginning = null;\n\n      this.count = () => {\n         let count = parseInt(document.getElementById(this.number).value);\n         return count;\n      };\n   }\n\n   countdownTime(deadlineTime) {\n      let deadline = deadlineTime.value;\n      const endTime = new Date(deadline).getTime();\n      const nowTime = new Date().getTime();\n\n      let hours = Math.floor((endTime / (1000 * 60 * 60) - nowTime / (1000 * 60 * 60)) % 24);\n      let minutes = Math.floor((endTime / (1000 * 60) - nowTime / (1000 * 60)) % 60);\n      // (+1 bag) one second is faster\n      let seconds = Math.floor((endTime / 1000 - nowTime / 1000) % 60 + 1);\n      hours = hours < 10 ? `0${hours}` : hours;\n      minutes = minutes < 10 ? `0${minutes}` : minutes;\n      seconds = seconds < 10 ? `0${seconds}` : seconds;\n\n      //display countdown  \n      if (isNaN(endTime)) {\n         this.selectTime.style.display = 'none';\n      } else {\n         this.selectTime.style.display = 'inline';\n      }\n      //access can start\n      this.access = Math.sign(seconds);\n      //sum of seconds \n      this.beforeBeginning = hours * 60 * 60 + minutes * 60 + seconds;\n      if (this.access > 0) {\n         this.selectTime.textContent = `${hours}:${minutes}:${seconds}`;\n      } else {\n         this.selectTime.textContent = '00:00:00';\n      }\n   }\n\n   canStart() {\n      return this.access;\n   }\n   secondsToStart() {\n      return parseInt(this.beforeBeginning);\n   }\n\n}\n\n//# sourceURL=webpack:///./js/modules/Settings.js?");

/***/ }),

/***/ "./js/modules/Start.js":
/*!*****************************!*\
  !*** ./js/modules/Start.js ***!
  \*****************************/
/*! exports provided: Start */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Start\", function() { return Start; });\n/* harmony import */ var _ActivePlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivePlayer.js */ \"./js/modules/ActivePlayer.js\");\n/* harmony import */ var _Time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Time.js */ \"./js/modules/Time.js\");\n/* harmony import */ var _Stopwatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Stopwatch.js */ \"./js/modules/Stopwatch.js\");\n/* harmony import */ var _Settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Settings.js */ \"./js/modules/Settings.js\");\n/* harmony import */ var _Players_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Players.js */ \"./js/modules/Players.js\");\n/* harmony import */ var _PlayerData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PlayerData.js */ \"./js/modules/PlayerData.js\");\n/* harmony import */ var _Restart_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Restart.js */ \"./js/modules/Restart.js\");\n\n\n\n\n\n\n\n\nclass Start {\n    constructor() {\n        this.access = true;\n        this.startRaceAccess = false;\n        this.btnStart = document.querySelector('.start');\n        this.btnRestart = document.querySelector('.restart');\n        this.playersList = [...document.querySelectorAll('.player-item')];\n        this.containerList = document.querySelector('.list-container');\n        this.settingTime = document.getElementById(\"start-time\");\n        this.clock = document.querySelector('.clock h2');\n        this.countdownTime = document.querySelector('.countdown-time');\n        this.containerStartTime = document.querySelector('.select-time');\n        this.spanCircle = document.querySelector('.span-start');\n        this.settingsContainer = document.querySelector('.settings-container');\n        this.infoPopup = document.querySelector('.info-popup');\n        this.acceptPopup = document.querySelector('.accept');\n        this.intervalTime = null;\n        this.btnOpenSettings = [...document.querySelectorAll('.open-settings-st')];\n        this.btnCloseSettings = [...document.querySelectorAll('.close-settings')];\n        this.btnFileLoad = document.querySelector('input[type=\"file\"]');\n        this.btnAddToList = document.querySelector('.add-to-list');\n        this.btnResetList = document.querySelector('.reset-list');\n        this.btnResetSettings = [...document.querySelectorAll('.reset-settings')];\n        this.playersPanelMobile = document.querySelector('.players-container');\n        this.end = 'GO!';\n\n        this.settings = new _Settings_js__WEBPACK_IMPORTED_MODULE_3__[\"Settings\"](\"interval-time\", this.countdownTime);\n        this.activePlayer = new _ActivePlayer_js__WEBPACK_IMPORTED_MODULE_0__[\"ActivePlayer\"](this.playersList);\n        this.time = new _Time_js__WEBPACK_IMPORTED_MODULE_1__[\"Time\"](this.clock);\n        this.stopwatch = new _Stopwatch_js__WEBPACK_IMPORTED_MODULE_2__[\"Stopwatch\"](this.spanCircle);\n        this.players = new _Players_js__WEBPACK_IMPORTED_MODULE_4__[\"Players\"](this.playersList, this.containerList, this.btnFileLoad);\n        this.restart = new _Restart_js__WEBPACK_IMPORTED_MODULE_6__[\"Restart\"](this.btnStart, this.btnRestart);\n\n        //render setup\n        this.render();\n\n        //display btn start\n        this.restart.displayBtn(this.access);\n\n        //upgrade players\n        this.players.displayPlayer();\n\n        // load players list\n        this.btnFileLoad.addEventListener('change', () => this.players.loadPlayerList());\n\n        // Add player to list\n        // document.querySelector('#to-do-player-list').addEventListener('submit', (e) => {\n        //     e.preventDefault();\n        //     const name = document.getElementById('name-player').value\n        //     const number = document.getElementById('nr-player').value\n\n        //     if (name === \"\" || number === \"\") return alert('uzupełnij pole');\n        //     if (number.length > 3) return alert('maxymalny numer zawodnika nie może być większy od 999')\n        //     if (this.access) {\n        //         const player = new PlayerData(name, number)\n        //         this.players.addPlayerToList(player)\n        //         this.players.storeAddPlayer(player)\n        //     }\n        //     if (!this.access) {\n        //         console.log(this.access)\n        //         return alert('W trakcie wyścigu nie można dodawać zawodników do listy')\n        //     }\n        // })\n\n        // Add player to list\n        document.querySelector('#to-do-player-list').addEventListener('submit', this.addPlayers.bind(this));\n\n        //clear list player\n        // document.querySelector('#file-upload-form').addEventListener('reset', () => {\n        //     if (this.access && this.playersList.length > 0) {\n        //         if (confirm(\"Czy chcesz wyczyścić zapisane dane?\")) {\n        //             localStorage.clear()\n        //             this.playersList.splice(0);\n        //             this.containerList.textContent = ''\n        //         }\n        //     } else throw new Error(\"Nie możesz czyścić listy w trakcie wyścigu\")\n        // })\n\n        //clear list player\n        document.querySelector('#file-upload-form').addEventListener('reset', this.clearListPlayers.bind(this));\n\n        // remove player from list\n        this.removePlayer();\n\n        //Start race\n        this.btnStart.addEventListener('click', this.startRace.bind(this));\n\n        //Restart race\n        this.btnRestart.addEventListener('click', () => {\n            setTimeout(this.restart.changeBtn, 1000);\n            location.reload();\n        });\n\n        // this.btnOpenSettings.addEventListener('click', () => this.settingsContainer.classList.add('display-container'))\n        this.btnOpenSettings.forEach(open => open.addEventListener('click', () => this.settingsContainer.classList.add('display-container')));\n\n        this.btnCloseSettings.forEach(close => close.addEventListener('click', () => close.parentNode.classList.remove('display-container')));\n\n        this.btnResetSettings.forEach(btn => btn.addEventListener('click', () => {\n            alert(\"Czy chcesz zresetować ustawienia ?\");\n            location.reload();\n        }));\n        //panelSettings mobile methods\n        document.querySelector('.mobile-player-lis').addEventListener('click', () => this.playersPanelMobile.classList.add('display-container'));\n    }\n\n    //metods----------------->\n    render() {\n        //clock and countdown to start\n        this.intervalTime = setInterval(() => {\n            this.time.getTime();\n            this.settings.countdownTime(this.settingTime);\n        }, 1000);\n\n        //setup circle interval time\n        this.stopwatch.timerSpan.textContent = this.settings.count();\n        document.getElementById('interval-time').addEventListener('change', () => {\n            this.stopwatch.timerSpan.textContent = this.settings.count();\n        });\n\n        //setup start time\n        this.containerStartTime.textContent = 'Ustaw godzinę startu';\n        document.getElementById('start-time').addEventListener('change', () => {\n            this.containerStartTime.textContent = this.settingTime.value.slice(11) + \":00\";\n            this.containerStartTime.classList.add('item-status-timer--big');\n        });\n    }\n\n    addPlayers(e) {\n        e.preventDefault();\n        const name = document.getElementById('name-player').value;\n        const number = document.getElementById('nr-player').value;\n\n        if (name === \"\" || number === \"\") return alert('uzupełnij pole');\n        if (number.length > 3) return alert('maxymalny numer zawodnika nie może być większy od 999');\n        if (this.access) {\n            const player = new _PlayerData_js__WEBPACK_IMPORTED_MODULE_5__[\"PlayerData\"](name, number);\n            this.players.addPlayerToList(player);\n            this.players.storeAddPlayer(player);\n        }\n        if (!this.access) {\n            console.log(this.access);\n            return alert('W trakcie wyścigu nie można dodawać zawodników do listy');\n        }\n    }\n\n    clearListPlayers() {\n        if (this.access && this.playersList.length > 0) {\n            if (confirm(\"Czy chcesz wyczyścić zapisane dane?\")) {\n                localStorage.clear();\n                this.playersList.splice(0);\n                this.containerList.textContent = '';\n            }\n        } else throw new Error(\"Nie możesz czyścić listy w trakcie wyścigu\");\n    }\n\n    removePlayer() {\n        this.containerList.addEventListener('click', e => {\n            if (this.access) {\n                this.players.deletePlayer(e.target);\n                this.players.storeRremovePlayer(e.target);\n            } else {\n                e.target.classList.add('.active-race');\n                this.infoPopup.classList.add('info-popup--active');\n            }\n        });\n    }\n\n    race(interval) {\n        let active = 0;\n        active++;\n        this.activePlayer.getPlayerPrepare(active);\n        setInterval(() => {\n            active++;\n            this.activePlayer.getPlayerPrepare(active);\n            this.activePlayer.getPlayerActive();\n            this.stopwatch.stopTimer(active, this.playersList);\n        }, interval);\n    }\n\n    startRace() {\n        let active = 0;\n        let timeSet = this.settings.count();\n        let timeInterval = this.settings.count() * 1000;\n\n        if (this.settingTime.value === '') {\n            return alert('Wybierz godzinę startu');\n        }\n\n        if (timeSet >= this.settings.secondsToStart() || isNaN(this.settings.secondsToStart())) {\n            return alert('Odstep czasowy nie może być mniejszy niż pozostały czas do startu');\n        }\n\n        if (this.playersList.length >= 2) {\n            this.access = false;\n            console.log(this.playersList.length);\n            this.activePlayer.getPlayerPrepare(active);\n            this.restart.displayBtn(this.access);\n            this.btnOpenSettings.forEach(btn => btn.classList.add('inactive'));\n            this.btnAddToList.classList.add('inactive');\n            this.btnResetList.classList.add('inactive');\n            this.btnFileLoad.setAttribute(\"disabled\", true);\n            document.querySelectorAll('.inactive').forEach(btn => btn.setAttribute(\"disabled\", true));\n\n            const intTime = setInterval(() => {\n                this.time.getTime();\n                clearInterval(this.intervalTime);\n            }, 1000);\n\n            const intCountdown = setInterval(() => {\n                this.settings.countdownTime(this.settingTime);\n            }, 1000);\n\n            const intBefore = setInterval(() => {\n                if (this.settings.secondsToStart() === timeSet) {\n                    this.stopwatch.timerSpan.textContent = timeSet;\n                    this.stopwatch.startTimer(timeSet, timeInterval);\n                }\n                if (this.stopwatch.timerSpan.textContent == 7) {\n                    var audio = new Audio('assets/beep.mp3');\n                    audio.play();\n                }\n                if (this.stopwatch.timerSpan.textContent <= 6) {\n                    this.spanCircle.style.color = '#00d9f6';\n                } else {\n                    this.spanCircle.style.color = 'rgb(230, 230, 230)';\n                }\n\n                this.stopwatch.showStartTxt(this.settings.canStart());\n            }, 1000);\n\n            const int = setInterval(() => {\n                if (this.settings.canStart() === 0) {\n                    clearInterval(int);\n                    this.activePlayer.getPlayerActive();\n                    this.race(timeInterval);\n                }\n            }, 1000);\n\n            const clear = setInterval(() => {\n                if (this.spanCircle.textContent === this.end) {\n                    clearInterval(intBefore);\n                    clearInterval(intCountdown);\n                    clearInterval(clear);\n                }\n            }, 1000);\n        } else return alert('W wyścigu musi brać udział więcej niż jedna osoba');\n    }\n\n}\n\n//# sourceURL=webpack:///./js/modules/Start.js?");

/***/ }),

/***/ "./js/modules/Stopwatch.js":
/*!*********************************!*\
  !*** ./js/modules/Stopwatch.js ***!
  \*********************************/
/*! exports provided: Stopwatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Stopwatch\", function() { return Stopwatch; });\nclass Stopwatch {\n    constructor(timerSpan) {\n        this.timerSpan = timerSpan;\n        this.circleAnimation;\n        this.stopwatchCounter;\n        this.access = true;\n    }\n    startTimer(timeSet, timeInterval) {\n        let time = timeSet;\n\n        const progressBar = new ProgressBar.Circle('#progress', {\n            color: '#00d9f6',\n            strokeWidth: 5,\n            duration: timeInterval,\n            easing: 'linear'\n        });\n        progressBar.animate(1);\n\n        this.circleAnimation = setInterval(function () {\n            progressBar.set(0);\n            progressBar.animate(1);\n        }, timeInterval);\n\n        this.stopwatchCounter = setInterval(() => {\n            timeSet--;\n            this.timerSpan.textContent = timeSet;\n            if (timeSet === 1) timeSet += time;\n            if (timeSet === time) {\n                this.timerSpan.textContent = 'START';\n                this.timerSpan.classList.add('span-start--active');\n            } else {\n                this.timerSpan.classList.remove('span-start--active');\n            }\n        }, 1000);\n    }\n    stopTimer(active, list) {\n        if (active === list.length) {\n            this.access = false;\n            clearInterval(this.circleAnimation);\n            setTimeout(() => {\n                clearInterval(this.stopwatchCounter);\n                this.timerSpan.textContent = 'GO!';\n            }, 1000);\n        }\n    }\n    showStartTxt(access) {\n        const infoAboutStartTxt = document.querySelector('.info-about-start');\n        const loader = document.querySelector('.lds-ellipsis');\n        const activePlayerTxt = document.querySelector('.active-player-name');\n\n        //setInterval delay this.timerSpan.textContent === '1'\n        if (this.timerSpan.textContent === '1' || access === 0) {\n            infoAboutStartTxt.classList.add('info-about-start--active');\n            loader.classList.remove('lds-ellipsis--active');\n            activePlayerTxt.classList.add('active-player-name--start');\n        } else {\n            infoAboutStartTxt.classList.remove('info-about-start--active');\n            activePlayerTxt.classList.remove('active-player-name--start');\n            loader.classList.add('lds-ellipsis--active');\n        }\n        if (this.timerSpan.textContent === 'GO!' || this.access === false) {\n            loader.classList.remove('lds-ellipsis--active');\n            infoAboutStartTxt.classList.remove('info-about-start--active');\n            activePlayerTxt.classList.remove('active-player-name--start');\n        }\n    }\n}\n\n//# sourceURL=webpack:///./js/modules/Stopwatch.js?");

/***/ }),

/***/ "./js/modules/Time.js":
/*!****************************!*\
  !*** ./js/modules/Time.js ***!
  \****************************/
/*! exports provided: Time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Time\", function() { return Time; });\nclass Time {\n    constructor(nowTime) {\n        this.nowTime = nowTime;\n        this.getTime = this.getTime.bind(this);\n    }\n    getTime() {\n        const time = new Date();\n        const seconds = time.getSeconds() < 10 ? \"0\" + time.getSeconds() : time.getSeconds();\n        const minutes = time.getMinutes() < 10 ? \"0\" + time.getMinutes() : time.getMinutes();\n        const hours = time.getHours() < 10 ? \"0\" + time.getHours() : time.getHours();\n        this.nowTime.textContent = `${hours}:${minutes}:${seconds}`;\n    }\n\n}\n\n//# sourceURL=webpack:///./js/modules/Time.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./sass/style.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./sass/style.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"@charset \\\"UTF-8\\\";\\n@keyframes loadAnim {\\n  0% {\\n    width: 150px; }\\n  100% {\\n    width: 0; } }\\n\\n@keyframes lampAnim {\\n  0% {\\n    background-color: red; }\\n  100% {\\n    background-color: green; } }\\n\\n@keyframes preparationLamp {\\n  0% {\\n    opacity: 1; }\\n  50% {\\n    opacity: 0.7; }\\n  100% {\\n    opacity: 1; } }\\n\\n@keyframes activeName {\\n  0% {\\n    opacity: 0; }\\n  100% {\\n    opacity: 1; } }\\n\\n@keyframes lds-ellipsis1 {\\n  0% {\\n    transform: scale(0); }\\n  100% {\\n    transform: scale(1); } }\\n\\n@keyframes lds-ellipsis3 {\\n  0% {\\n    transform: scale(1); }\\n  100% {\\n    transform: scale(0); } }\\n\\n@keyframes lds-ellipsis2 {\\n  0% {\\n    transform: translate(0, 0); }\\n  100% {\\n    transform: translate(24px, 0); } }\\n\\n* {\\n  margin: 0;\\n  padding: 0;\\n  box-sizing: border-box; }\\n\\nbody {\\n  font-family: 'Roboto', sans-serif;\\n  color: #e6e6e6;\\n  letter-spacing: .08rem; }\\n\\nbutton {\\n  cursor: pointer; }\\n\\nbutton:hover {\\n  opacity: 1; }\\n\\nbutton:focus {\\n  outline: none; }\\n\\nbutton:active {\\n  border: none; }\\n\\ninput:active {\\n  border: none; }\\n\\ninput:focus {\\n  border: none; }\\n\\ninput::selection {\\n  border: none; }\\n\\n.inactive {\\n  opacity: 1;\\n  position: relative; }\\n\\n.inactive::before {\\n  content: 'W trakcie wyścigu nie można edytować parametrów';\\n  position: absolute;\\n  left: 30px;\\n  top: 0;\\n  color: #8f8f8f;\\n  font-size: 16px;\\n  line-height: 1.2rem;\\n  -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  background-color: #1f1f1f;\\n  border-radius: 20px;\\n  width: 120px;\\n  top: 20px;\\n  right: 20px;\\n  z-index: 999;\\n  border: 1px solid rgba(109, 109, 109, 0.4);\\n  padding: 10px 20px;\\n  display: none; }\\n\\n.inactive:hover::before {\\n  display: block; }\\n\\n.app {\\n  width: 100%;\\n  height: 100vh;\\n  background-color: #131313;\\n  padding: 3rem 2em;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n\\n.app__container {\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  position: relative;\\n  background-color: #212121;\\n  height: 100%;\\n  padding: 30px;\\n  display: flex;\\n  align-items: center; }\\n\\n.players-container {\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  background-color: #212121;\\n  position: relative;\\n  width: auto;\\n  max-width: 460px;\\n  min-width: 300px;\\n  height: 100%;\\n  display: flex;\\n  flex-direction: column;\\n  padding: 20px 0; }\\n\\n.settings-panel {\\n  width: 100%;\\n  position: relative;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  margin-bottom: 40px;\\n  padding: 0 20px 20px;\\n  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.3);\\n  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.3); }\\n  .settings-panel p {\\n    color: gray;\\n    margin-left: 20px; }\\n\\n.colose-player-container {\\n  font-size: 38px;\\n  position: absolute;\\n  left: 20px;\\n  top: 20px;\\n  cursor: pointer;\\n  z-index: 999;\\n  display: none;\\n  opacity: .8; }\\n\\n.colose-player-container:hover {\\n  opacity: 1; }\\n\\n.settings {\\n  position: relative; }\\n  .settings ion-icon {\\n    font-size: 38px;\\n    color: #e6e6e6;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center; }\\n\\n.open-settings {\\n  -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  background-color: #1f1f1f;\\n  border-radius: 20px;\\n  opacity: .8;\\n  border-radius: 12px;\\n  border: 1px solid #414141;\\n  color: #e6e6e6;\\n  background-color: #272727;\\n  padding: 12px 20px;\\n  cursor: pointer; }\\n\\n.reset-settings {\\n  height: 40px;\\n  width: 125px;\\n  background: none;\\n  border: 1px solid #464646;\\n  color: #e6e6e6;\\n  opacity: .8;\\n  margin-left: 10px;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  border-radius: 7px;\\n  cursor: pointer;\\n  background-color: #272727; }\\n\\n.reset-settings:hover {\\n  opacity: 1; }\\n\\n.settings-container {\\n  position: absolute;\\n  display: none;\\n  flex-direction: column;\\n  width: 370px;\\n  height: 250px;\\n  top: 80px;\\n  left: 60px;\\n  z-index: 999;\\n  -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  background-color: #1f1f1f;\\n  border-radius: 20px;\\n  padding: 20px; }\\n  .settings-container ion-icon {\\n    align-self: flex-start;\\n    padding: 5px;\\n    border-radius: 50%;\\n    margin-bottom: 15px;\\n    opacity: .8;\\n    cursor: pointer;\\n    font-size: 30px; }\\n  .settings-container ion-icon:hover {\\n    opacity: 1; }\\n  .settings-container .settings-element {\\n    display: flex;\\n    align-items: center;\\n    padding: 15px 10px;\\n    justify-content: space-between;\\n    border-top: 1px solid #464646;\\n    border-bottom: 1px solid #464646;\\n    color: #b3b3b3; }\\n    .settings-container .settings-element input {\\n      background-color: #e6e6e6;\\n      border: none;\\n      font-size: 14px;\\n      padding: 5px;\\n      width: 120px;\\n      border-radius: 3px; }\\n\\n#file-upload-form {\\n  padding: 0 20px;\\n  width: 100%;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: flex-end; }\\n\\n.file-upload {\\n  width: 50%; }\\n\\n.file-upload label {\\n  font-size: 14px;\\n  font-weight: lighter;\\n  color: gray; }\\n\\n.file-button {\\n  margin-top: 10px;\\n  background: #272727;\\n  outline: none;\\n  cursor: pointer;\\n  color: #8f8f8f;\\n  border-radius: 50px;\\n  border: 1px solid #131313; }\\n\\n::-webkit-file-upload-button {\\n  color: #e6e6e6;\\n  background: #3a3a3a;\\n  padding: 10px 20px;\\n  border: none;\\n  cursor: pointer;\\n  -webkit-box-shadow: 2px 0px 2px -1px rgba(0, 0, 0, 0.8);\\n  box-shadow: 2px 0px 2px -1px rgba(0, 0, 0, 0.8);\\n  border-radius: 0 50px 50px 0;\\n  outline: none;\\n  opacity: 1;\\n  color: #b3b3b3; }\\n\\n::-webkit-file-upload-button:hover {\\n  opacity: .8; }\\n\\n.reset-list {\\n  height: 40px;\\n  width: 125px;\\n  background: none;\\n  border: 1px solid #464646;\\n  color: #e6e6e6;\\n  opacity: .8;\\n  margin-left: 10px;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  border-radius: 7px;\\n  cursor: pointer; }\\n\\n#to-do-player-list {\\n  width: 100%;\\n  display: flex;\\n  align-items: flex-end;\\n  justify-content: space-between;\\n  padding: 0 20px;\\n  margin: 25px 0 10px; }\\n  #to-do-player-list .form-inputs {\\n    display: flex; }\\n  #to-do-player-list label {\\n    font-size: 14px;\\n    font-weight: lighter;\\n    color: gray; }\\n  #to-do-player-list input {\\n    -webkit-box-shadow: inset 0px 0px 15px -4px #000000;\\n    box-shadow: inset 0px 0px 15px -4px #000000;\\n    border-radius: 5px;\\n    padding: 10px;\\n    background-color: #1f1f1f;\\n    border: 1px solid #464646;\\n    margin-top: 8px;\\n    box-shadow: none;\\n    margin-right: 10px;\\n    color: #e6e6e6;\\n    -webkit-box-shadow: inset 0px 0px 15px -4px #000000;\\n    box-shadow: inset 0px 0px 15px -4px #000000; }\\n    #to-do-player-list input input:active {\\n      border: 1px solid grey; }\\n  #to-do-player-list #nr-player {\\n    max-width: 60px; }\\n  #to-do-player-list .add-to-list {\\n    height: 40px;\\n    width: 125px;\\n    background: none;\\n    border: 1px solid #464646;\\n    color: #e6e6e6;\\n    opacity: .8;\\n    margin-left: 10px;\\n    border-radius: 12px;\\n    -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n    border-radius: 7px;\\n    cursor: pointer; }\\n  #to-do-player-list .add-to-list:hover {\\n    opacity: 1; }\\n\\n.list__item-desc {\\n  display: flex;\\n  padding: 20px 50px;\\n  width: 100%;\\n  color: #464646; }\\n  .list__item-desc .name-player-desc {\\n    padding: 10px 0;\\n    border-right: 1px solid #353535;\\n    width: 187.9px; }\\n  .list__item-desc .name-player-desc,\\n  .list__item-desc .number-player-desc,\\n  .list__item-desc .status-player-desc {\\n    line-height: 10px; }\\n  .list__item-desc .number-player-desc,\\n  .list__item-desc .status-player-desc {\\n    padding: 10px 0;\\n    border-right: 1px solid #353535;\\n    min-width: 60px;\\n    text-align: center; }\\n  .list__item-desc .status-player-desc {\\n    border-right: none;\\n    padding-left: 20px; }\\n\\n.list-container {\\n  overflow-y: scroll;\\n  margin: 0 20px;\\n  padding: 5px 20px;\\n  border-radius: 7px;\\n  max-height: 470px;\\n  min-height: 60px;\\n  -webkit-box-shadow: inset 0px 0px 6px -1px rgba(0, 0, 0, 0.9);\\n  box-shadow: inset 0px 0px 6px -1px rgba(0, 0, 0, 0.9); }\\n  .list-container::-webkit-scrollbar {\\n    width: 10px;\\n    background-color: lightgray;\\n    border-radius: 10px; }\\n  .list-container::-webkit-scrollbar-thumb {\\n    background-color: gray;\\n    border-radius: 10px; }\\n\\n.player-item {\\n  padding: 10px;\\n  width: 100%;\\n  height: 65px;\\n  display: flex;\\n  align-items: center;\\n  color: #b3b3b3;\\n  border-bottom: 1px solid #353535; }\\n  .player-item h5 {\\n    font-weight: lighter;\\n    font-size: .9rem;\\n    padding: 10px 0;\\n    border-right: 1px solid #353535;\\n    width: 260px;\\n    overflow-x: scroll; }\\n    .player-item h5::-webkit-scrollbar {\\n      opacity: 0;\\n      height: 0; }\\n  .player-item p {\\n    padding: 10px 0;\\n    border-right: 1px solid #353535;\\n    min-width: 60px;\\n    text-align: center;\\n    font-size: .9rem; }\\n  .player-item ion-icon {\\n    border-left: 1px solid #353535;\\n    padding: 10px 5px 10px 20px;\\n    color: #b3b3b3;\\n    font-size: 1.2rem;\\n    cursor: pointer; }\\n\\n.player-item:last-child {\\n  border-bottom: none; }\\n\\n.lamp {\\n  width: 60px;\\n  height: 40px;\\n  box-sizing: content-box;\\n  padding: 10px;\\n  position: relative; }\\n  .lamp::before {\\n    content: '';\\n    position: absolute;\\n    width: 15px;\\n    height: 15px;\\n    left: 50%;\\n    top: 50%;\\n    transform: translate(-50%, -50%);\\n    background-color: red;\\n    border-radius: 50%; }\\n  .lamp::after {\\n    content: '';\\n    position: absolute;\\n    width: 25px;\\n    height: 25px;\\n    left: 50%;\\n    top: 50%;\\n    transform: translate(-50%, -50%);\\n    border: 1px solid red;\\n    border-radius: 50%; }\\n\\n.lamp--prepare {\\n  animation: preparationLamp 1.5s infinite both; }\\n  .lamp--prepare::after {\\n    border: 2px solid orange; }\\n  .lamp--prepare::before {\\n    background-color: orange; }\\n\\n.lamp--active::after {\\n  border: 2px solid green; }\\n\\n.lamp--active::before {\\n  background-color: green; }\\n\\n.counting-down-container {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  flex-direction: column;\\n  justify-content: space-evenly;\\n  height: 100%;\\n  width: 650px;\\n  min-width: 300px;\\n  margin-left: 40px;\\n  padding: 20px 30px; }\\n\\n.circular-container {\\n  width: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  padding: 40px;\\n  background-color: #1f1f1f; }\\n\\n.circular {\\n  width: 250px;\\n  height: 250px;\\n  border: 13px solid gray;\\n  border-radius: 50%;\\n  position: relative;\\n  display: inline-block; }\\n  .circular .span-start {\\n    position: absolute;\\n    left: 50%;\\n    top: 50%;\\n    transform: translate(-50%, -50%);\\n    font-size: 70px;\\n    color: #e6e6e6;\\n    user-select: none;\\n    font-weight: 600; }\\n  .circular .span-start--active {\\n    font-size: 55px; }\\n\\n.progress {\\n  width: 250px;\\n  height: 250px;\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n  transform: translate(-50%, -50%);\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n  .progress svg {\\n    height: 100%;\\n    display: block; }\\n\\n.player-status-container {\\n  width: 100%; }\\n\\n.status-container {\\n  padding: 15px 20px 15px;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  margin-top: 20px;\\n  width: 100%;\\n  border: 1px solid #272727;\\n  background-color: #1f1f1f; }\\n\\n.title-name-container {\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  position: relative;\\n  padding: 0 0 10px; }\\n  .title-name-container ion-icon {\\n    color: gray;\\n    font-size: 28px;\\n    margin-right: 10px; }\\n\\n.title-name {\\n  font-size: 18px;\\n  font-weight: lighter;\\n  color: #8f8f8f; }\\n\\n.player-status {\\n  background-color: #212121;\\n  -webkit-box-shadow: inset 0px 0px 6px -2px #000000;\\n  box-shadow: inset 0px 0px 6px -2px #000000;\\n  border: 1px solid #353535;\\n  padding: 10px 20px;\\n  width: 100%;\\n  border-radius: 7px;\\n  display: flex;\\n  justify-content: center;\\n  color: grey;\\n  height: 70px;\\n  overflow-x: hidden;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n\\n.load {\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n  transform: translate(-50%, -50%); }\\n\\n.active-player-name,\\n.next-player-name {\\n  font-size: 26px; }\\n\\n.active-player-name {\\n  color: orange;\\n  opacity: 0;\\n  animation: preparationLamp 2s infinite both; }\\n\\n.active-player-name--start {\\n  color: green; }\\n\\n.info-about-start {\\n  position: absolute;\\n  left: 50%;\\n  top: 50%;\\n  transform: translate(-50%, -50%);\\n  font-size: 24px;\\n  letter-spacing: 2px;\\n  text-transform: uppercase;\\n  color: #e6e6e6;\\n  opacity: 0; }\\n\\n.info-about-start--active {\\n  animation: activeName 0s linear both; }\\n\\n.lds-ellipsis {\\n  display: inline-block;\\n  position: relative;\\n  width: 80px;\\n  height: 30px;\\n  display: none; }\\n\\n.lds-ellipsis--active {\\n  display: inline-block; }\\n\\n.lds-ellipsis div {\\n  position: absolute;\\n  top: 30%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n  width: 13px;\\n  height: 13px;\\n  border-radius: 50%;\\n  background: #b3b3b3;\\n  animation-timing-function: cubic-bezier(0, 1, 1, 0); }\\n\\n.lds-ellipsis div:nth-child(1) {\\n  left: 8px;\\n  animation: lds-ellipsis1 0.6s infinite; }\\n\\n.lds-ellipsis div:nth-child(2) {\\n  left: 8px;\\n  animation: lds-ellipsis2 0.6s infinite; }\\n\\n.lds-ellipsis div:nth-child(3) {\\n  left: 32px;\\n  animation: lds-ellipsis2 0.6s infinite; }\\n\\n.lds-ellipsis div:nth-child(4) {\\n  left: 56px;\\n  animation: lds-ellipsis3 0.6s infinite; }\\n\\n.control-panel {\\n  padding: 30px 0;\\n  height: 100%;\\n  width: 300px;\\n  margin-left: 40px;\\n  display: flex;\\n  flex-direction: column;\\n  position: relative;\\n  align-items: center; }\\n\\n.logo {\\n  width: 180px;\\n  max-width: 180px;\\n  max-height: 80px;\\n  margin-bottom: 30px; }\\n  .logo img {\\n    width: 100%;\\n    object-fit: cover; }\\n\\n.clock {\\n  -webkit-box-shadow: inset 0px 0px 15px -4px #000000;\\n  box-shadow: inset 0px 0px 15px -4px #000000;\\n  -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n  background-color: #1f1f1f;\\n  border-radius: 20px;\\n  width: 100%;\\n  padding: 20px;\\n  border: 1px solid #353535;\\n  border-radius: 10px;\\n  margin-bottom: 20px;\\n  text-align: center; }\\n  .clock h2 {\\n    font-size: 38px;\\n    user-select: none; }\\n\\n.status-timer {\\n  width: 100%;\\n  display: flex;\\n  justify-content: space-between;\\n  flex-direction: column; }\\n\\n.status-timer-container {\\n  padding: 10px;\\n  width: 100%;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  border: 1px solid #272727;\\n  background-color: #1f1f1f;\\n  margin-top: 20px;\\n  border-radius: 7px; }\\n\\n.title-status-timer {\\n  font-size: 14px;\\n  color: #8f8f8f;\\n  line-height: 1.2rem;\\n  padding: 0 5px 10px; }\\n\\n.item-status-timer {\\n  -webkit-box-shadow: inset 0px 0px 6px -2px #000000;\\n  box-shadow: inset 0px 0px 6px -2px #000000;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  width: 100%;\\n  border: 1px solid #272727;\\n  border-radius: 5px;\\n  min-height: 65px;\\n  margin-right: 15px;\\n  font-size: 17px;\\n  background-color: #212121; }\\n\\n.item-status-timer--big {\\n  font-size: 26px; }\\n\\n.countdown-time {\\n  font-size: 26px; }\\n\\n.select-time {\\n  color: orange;\\n  font-weight: 800; }\\n\\n.start,\\n.restart {\\n  width: 170px;\\n  cursor: pointer;\\n  background-color: transparent;\\n  border: 2px solid green;\\n  color: #e6e6e6;\\n  font-size: 24px;\\n  padding: 12px 20px;\\n  border-radius: 50px;\\n  opacity: .8;\\n  transition: .2s;\\n  letter-spacing: 0.07rem;\\n  display: block;\\n  margin: 50px auto;\\n  font-size: 20px; }\\n\\n.start-disable {\\n  display: none; }\\n\\n.restart-disable {\\n  display: none; }\\n\\n.info-popup {\\n  position: absolute;\\n  top: 30%;\\n  left: 20%;\\n  text-align: center;\\n  color: white;\\n  padding: 35px 50px;\\n  border-radius: 10px;\\n  border: 1px solid #b3b3b3;\\n  background-color: #1f1f1f;\\n  -webkit-box-shadow: inset 0px 0px 15px -4px #000000;\\n  box-shadow: inset 0px 0px 15px -4px #000000;\\n  border-radius: 12px;\\n  -webkit-box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.6);\\n  line-height: 1.6rem;\\n  display: none; }\\n\\n.info-popup--active {\\n  display: block; }\\n\\n.accept {\\n  padding: 10px 20px;\\n  border-radius: 7px;\\n  border: 1px solid #8f8f8f;\\n  margin-top: 20px;\\n  background-color: #464646;\\n  color: white;\\n  opacity: .8; }\\n\\n.mobile-icons {\\n  margin-bottom: 40px;\\n  padding: 10px 0 20px;\\n  width: 100%;\\n  display: flex;\\n  align-items: center;\\n  justify-content: space-between;\\n  display: none; }\\n\\n@media screen and (max-width: 1600px) {\\n  .players-container {\\n    max-width: 440px; }\\n  ::-webkit-file-upload-button {\\n    padding: 10px; }\\n  .counting-down-container {\\n    margin-left: 20px;\\n    padding: 20px; }\\n  .control-panel {\\n    width: 300px;\\n    margin-left: 20px; } }\\n\\n@media screen and (max-width: 1540px) {\\n  .app {\\n    height: 100vh;\\n    padding: 30px 20px; }\\n  .app__container {\\n    display: flex;\\n    width: auto;\\n    justify-content: space-evenly;\\n    align-items: center;\\n    padding: 40px; }\\n  .circular-container {\\n    padding: 40px; }\\n  .status-container {\\n    padding: 10px 20px 15px; }\\n  .settings-panel {\\n    padding: 20px 0 30px; }\\n  .colose-player-container {\\n    display: inline; }\\n  .logo {\\n    margin-bottom: 10px; }\\n  .clock {\\n    margin-bottom: 10px; }\\n  .start,\\n  .restart {\\n    margin: 30px; }\\n  .counting-down-container {\\n    width: 750px;\\n    padding: 20px;\\n    margin: 0; }\\n  .control-panel {\\n    height: 100%;\\n    margin-left: 30px;\\n    padding: 0; }\\n  .players-container {\\n    position: absolute;\\n    left: 50%;\\n    max-width: 500px;\\n    min-width: 500px;\\n    width: 600px;\\n    max-height: 660px;\\n    z-index: 100;\\n    display: none;\\n    transform: translateX(-50%); }\\n  .players-container--active {\\n    display: flex; }\\n  .settings-container {\\n    top: 80px;\\n    left: 40%; }\\n  .mobile-icons {\\n    display: flex;\\n    margin-bottom: 20px; }\\n  .open-settings,\\n  .mobile-player-lis,\\n  .reset-settings {\\n    -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n    box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n    background-color: #1f1f1f;\\n    border-radius: 20px;\\n    opacity: .8;\\n    border-radius: 12px;\\n    border: 1px solid #414141;\\n    color: #e6e6e6;\\n    background-color: #272727;\\n    padding: 12px 20px;\\n    cursor: pointer;\\n    padding: 12px 20px;\\n    margin: 0 5px; }\\n    .open-settings ion-icon,\\n    .mobile-player-lis ion-icon,\\n    .reset-settings ion-icon {\\n      font-size: 28px; }\\n  .open-settings-desktop,\\n  .reset-settings-desktop {\\n    display: none; }\\n  .reset-settings {\\n    width: auto;\\n    height: 100%; }\\n  .list__item-desc .name-player-desc {\\n    width: 217.73px; }\\n  .list__item-desc .number-player-desc {\\n    min-width: 60px; } }\\n\\n@media screen and (max-width: 1200px) {\\n  .app__container {\\n    padding: 20px; }\\n  .control-panel {\\n    margin-left: 20px;\\n    width: 280px; }\\n  .counting-down-container {\\n    width: 650px; } }\\n\\n@media screen and (max-width: 1050px) {\\n  .counting-down-container {\\n    width: 600px; }\\n  .control-panel {\\n    width: 260px; } }\\n\\n@media screen and (max-width: 950px) {\\n  .app {\\n    height: auto;\\n    min-height: 100vh;\\n    padding: 0;\\n    background-color: #212121; }\\n  .app__container {\\n    flex-direction: column-reverse;\\n    height: 100%;\\n    padding: 20px 20px 40px;\\n    border-radius: 0;\\n    box-shadow: none; }\\n  .control-panel {\\n    flex-direction: row;\\n    align-items: flex-end;\\n    height: auto;\\n    width: 100%;\\n    max-width: 100%;\\n    margin: 80px 0 20px;\\n    position: static; }\\n  .counting-down-container {\\n    box-shadow: none;\\n    background-color: transparent;\\n    padding: 0;\\n    justify-content: flex-start;\\n    height: auto;\\n    margin-bottom: 100px;\\n    width: 700px; }\\n  .circular-container {\\n    padding: 20px; }\\n  .circular {\\n    width: 230px;\\n    height: 230px; }\\n  .progress {\\n    width: 230px;\\n    height: 230px; }\\n  .status-container {\\n    padding: 15px; }\\n  .player-status {\\n    height: 60px; }\\n  .mobile-icons {\\n    position: absolute;\\n    top: 0;\\n    right: 0;\\n    margin-bottom: 0;\\n    padding: 20px 15px;\\n    max-width: 300px;\\n    box-shadow: none; }\\n  .start,\\n  .restart {\\n    position: absolute;\\n    margin: 40px 0;\\n    bottom: 0;\\n    left: 50%;\\n    transform: translateX(-50%); }\\n  .logo {\\n    max-width: 100px;\\n    position: absolute;\\n    left: 20px;\\n    top: 20px; }\\n  .clock {\\n    width: auto;\\n    padding: 26px;\\n    border: 1px solid #353535;\\n    border-radius: 10px;\\n    margin: 0;\\n    text-align: center; }\\n    .clock h2 {\\n      font-size: 30px;\\n      user-select: none; }\\n  .status-timer {\\n    flex-direction: row;\\n    justify-content: flex-end; }\\n  .status-timer-container {\\n    padding: 2px;\\n    margin-top: 0; }\\n  .title-status-timer {\\n    font-size: 12px;\\n    padding: 10px 5px; }\\n  .status-timer-container {\\n    margin-left: 20px; }\\n  .item-status-timer {\\n    min-height: 40px;\\n    margin-top: 0;\\n    padding: 6px 0; } }\\n\\n@media screen and (max-width: 750px) {\\n  .counting-down-container {\\n    width: 600px; }\\n  .status-timer-container {\\n    margin-left: 15px; }\\n  .item-status-timer {\\n    font-size: 12px; }\\n  .title-status-timer {\\n    padding: 5px; }\\n  .clock {\\n    padding: 18px; } }\\n\\n@media screen and (max-width: 648px) {\\n  .app__container {\\n    width: 100%;\\n    min-height: 100vh;\\n    padding: 20px;\\n    height: auto; }\\n  .counting-down-container {\\n    width: 100%; }\\n  .status-container {\\n    padding: 10px; }\\n  .player-status {\\n    height: 50px;\\n    padding: 5px 10px; }\\n  .control-panel {\\n    flex-direction: column;\\n    margin-top: 100px; }\\n  .clock {\\n    align-self: flex-end;\\n    margin-bottom: 15px;\\n    padding: 12px; }\\n  .status-timer-container:first-child {\\n    margin-left: 0; }\\n  .item-status-timer--big {\\n    font-size: 20px; }\\n  .countdown-time {\\n    font-size: 20px; } }\\n\\n@media screen and (max-width: 548px) {\\n  .players-container {\\n    max-width: 400px;\\n    min-width: 300px;\\n    width: 400px;\\n    top: 100px;\\n    max-height: 600px;\\n    z-index: 100;\\n    display: none;\\n    transform: translateX(-50%); }\\n  .settings-panel {\\n    margin-bottom: 20px;\\n    padding: 15px 20px; }\\n  .colose-player-container {\\n    left: 10px;\\n    top: 5px; }\\n  #to-do-player-list {\\n    flex-direction: column;\\n    align-items: flex-start;\\n    margin: 15px 0 0; }\\n    #to-do-player-list label {\\n      font-size: 12px; }\\n    #to-do-player-list .add-to-list {\\n      margin-left: 0;\\n      margin-top: 10px; }\\n  #file-upload-form {\\n    flex-direction: column;\\n    align-items: flex-start; }\\n  .file-upload {\\n    width: 100%; }\\n  .file-upload label {\\n    font-size: 12px; }\\n  .reset-list {\\n    margin-left: 0;\\n    margin-top: 15px; }\\n  .list__item-desc {\\n    margin-top: 10px;\\n    padding: 10px 25px;\\n    font-size: 14px; }\\n    .list__item-desc .name-player-desc {\\n      width: 133.09px; }\\n    .list__item-desc .number-player-desc {\\n      min-width: 50px; }\\n  .player-item {\\n    height: 60px;\\n    padding: 10px 5px; }\\n    .player-item h5 {\\n      font-size: .8rem; }\\n    .player-item p {\\n      padding: 10px 0;\\n      border-right: 1px solid #353535;\\n      min-width: 50px;\\n      font-size: .8rem; }\\n    .player-item ion-icon {\\n      padding: 5px 5px 5px 15px;\\n      font-size: 30px; }\\n  .lamp::before {\\n    width: 12px;\\n    height: 12px; }\\n  .lamp::after {\\n    width: 22px;\\n    height: 22px; } }\\n\\n@media screen and (max-width: 420px) {\\n  .title-status-timer {\\n    font-size: 11px;\\n    padding: 0px 3px; }\\n  .item-status-timer {\\n    min-height: 30px;\\n    height: 30px;\\n    padding: 4px;\\n    font-size: 11px;\\n    border-radius: 5px; }\\n  .counting-down-container {\\n    margin-bottom: 70px; }\\n  .circular-container {\\n    padding: 12px; }\\n  .circular {\\n    width: 140px;\\n    height: 140px;\\n    border: 8px solid gray; }\\n    .circular .span-start {\\n      font-size: 44px; }\\n    .circular .span-start--active {\\n      font-size: 32px; }\\n  .progress {\\n    width: 140px;\\n    height: 140px; }\\n  .status-container {\\n    margin-top: 10px;\\n    padding: 5px; }\\n  .player-status {\\n    height: 35px;\\n    padding: 3px 7px; }\\n    .player-status h4 {\\n      font-size: 16px; }\\n  .title-name-container {\\n    padding: 0 4px 4px; }\\n    .title-name-container ion-icon {\\n      color: gray;\\n      font-size: 14px;\\n      margin-right: 10px; }\\n  .title-name {\\n    font-size: 12px; }\\n  .mobile-icons {\\n    max-width: 220px; }\\n  .open-settings,\\n  .mobile-player-lis,\\n  .reset-settings {\\n    -webkit-box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n    box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.5);\\n    background-color: #1f1f1f;\\n    border-radius: 20px;\\n    opacity: .8;\\n    border-radius: 12px;\\n    border: 1px solid #414141;\\n    color: #e6e6e6;\\n    background-color: #272727;\\n    padding: 12px 20px;\\n    cursor: pointer;\\n    padding: 10px 15px;\\n    margin: 0; }\\n    .open-settings ion-icon,\\n    .mobile-player-lis ion-icon,\\n    .reset-settings ion-icon {\\n      font-size: 24px; }\\n  .control-panel {\\n    margin: 65px 0 10px; }\\n  .clock {\\n    padding: 10px; }\\n    .clock h2 {\\n      font-size: 22px; }\\n  .start,\\n  .restart {\\n    width: 120px;\\n    margin: 30px auto;\\n    padding: 10px 20px; }\\n  .settings-container {\\n    width: 320px;\\n    height: 220px;\\n    top: 20px;\\n    left: 50%;\\n    transform: translateX(-50%);\\n    padding: 15px; }\\n    .settings-container label {\\n      font-size: 14px; }\\n  .players-container {\\n    max-width: 330px;\\n    min-width: 320px;\\n    width: 350px;\\n    max-height: 600px;\\n    top: 10px;\\n    padding: 15px 0 15px; }\\n  .list-container {\\n    margin: 0 12px;\\n    padding: 5px 8px; } }\\n\\n@media screen and (max-width: 320px) {\\n  .logo {\\n    max-width: 80px; } }\\n\\n.display-container {\\n  display: flex; }\\n\\n.remove-display {\\n  display: none; }\\n\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./sass/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(selector) {\n\t\tif (typeof memo[selector] === \"undefined\") {\n\t\t\tmemo[selector] = fn.call(this, selector);\n\t\t}\n\n\t\treturn memo[selector]\n\t};\n})(function (target) {\n\treturn document.querySelector(target)\n});\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton) options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n\tif (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else {\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\toptions.attrs.type = \"text/css\";\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\toptions.attrs.type = \"text/css\";\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./sass/style.scss\");\nif(typeof content === 'string') content = [[module.i, content, '']];\n// Prepare cssTransformation\nvar transform;\n\nvar options = {}\noptions.transform = transform\n// add the styles to the DOM\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./sass/style.scss\", function() {\n\t\t\tvar newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./sass/style.scss\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./sass/style.scss?");

/***/ })

/******/ });