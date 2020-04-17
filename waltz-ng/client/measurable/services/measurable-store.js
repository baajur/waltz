/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017, 2018, 2019 Waltz open source project
 * See README.md for more information
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific
 *
 */
import {checkIsIdSelector} from "../../common/checks"


function store($http, baseApiUrl) {
    const baseUrl = `${baseApiUrl}/measurable`;

    const findAll = () => $http
        .get(`${baseUrl}/all`)
        .then(d => d.data);

    const getById = (id) => $http
        .get(`${baseUrl}/id/${id}`)
        .then(d => d.data);

    const findByExternalId = (extId) => $http
        .get(`${baseUrl}/external-id/${extId}`)
        .then(d => d.data);

    const findMeasurablesBySelector = (options) => {
        checkIsIdSelector(options);
        return $http
            .post(`${baseUrl}/measurable-selector`, options)
            .then(d => d.data);
    };

    const findHierarchyForDirectSelector = (options) => {
        checkIsIdSelector(options);
        return $http
            .post(`${baseUrl}/hierarchy/direct-selector`, options)
            .then(d => d.data);
    };

    const findHierarchyForIndirectSelector = (options) => {
        checkIsIdSelector(options);
        return $http
            .post(`${baseUrl}/hierarchy/indirect-selector`, options)
            .then(d => d.data);
    };

    const search = (query) => $http
        .get(`${baseUrl}/search/${query}`)
        .then(x => x.data);

    return {
        findAll,
        findByExternalId,
        findMeasurablesBySelector,
        findHierarchyForDirectSelector,
        findHierarchyForIndirectSelector,
        getById,
        search
    };

}


store.$inject = ["$http", "BaseApiUrl"];


const serviceName = "MeasurableStore";


export default {
    store,
    serviceName
};


export const MeasurableStore_API = {
    findAll: {
        serviceName,
        serviceFnName: "findAll",
        description: "findAll"
    },
    getById: {
        serviceName,
        serviceFnName: "getById",
        description: "getById"
    },
    findByExternalId: {
        serviceName,
        serviceFnName: "findByExternalId",
        description: "saves an entity named note"
    },
    search: {
        serviceName,
        serviceFnName: "search",
        description: "executes search"
    },
    findMeasurablesBySelector: {
        serviceName,
        serviceFnName: "findMeasurablesBySelector",
        description: "executes findMeasurablesBySelector"
    },
    findHierarchyForDirectSelector: {
        serviceName,
        serviceFnName: "findHierarchyForDirectSelector",
        description: "returns hierarchy of directly related measurables for a given selector"
    },
    findHierarchyForIndirectSelector: {
        serviceName,
        serviceFnName: "findHierarchyForIndirectSelector",
        description: "returns hierarchy of measurables (via applications) for a given selector"
    }
};