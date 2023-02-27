// This file is part of InvenioRDM
// Copyright (C) 2023 CERN.
//
// InvenioRDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/invenio_app_rdm/i18next";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { OverridableContext } from "react-overridable";
import {
  EmptyResults,
  Error,
  InvenioSearchApi,
  ReactSearchKit,
  ResultsList,
  ResultsLoader,
  SearchBar,
  Pagination,
} from "react-searchkit";
import { Container } from "semantic-ui-react";
import { CommunityItem } from "../CommunitiesListModal/CommunityItem";

const appName = "InvenioAppRdm.PendingCommunitiesSearch";

const overriddenComponents = {
  [`${appName}.ResultsList.item`]: CommunityItem,
};

export class PendingCommunitiesSearch extends Component {
  render() {
    const { pendingCommunitiesEndpoint } = this.props;
    const searchApi = new InvenioSearchApi({
      axios: {
        url: pendingCommunitiesEndpoint,
        headers: { Accept: "application/vnd.inveniordm.v1+json" },
      },
    });

    return (
      <OverridableContext.Provider value={overriddenComponents}>
        <ReactSearchKit
          appName={appName}
          urlHandlerApi={{ enabled: false }}
          searchApi={searchApi}
          initialQueryState={{ size: 5, page: 1 }}
        >
          <Container fluid>
            <Container fluid>
              <SearchBar
                autofocus
                actionProps={{
                  icon: "search",
                  content: null,
                  className: "search",
                }}
                placeholder={i18next.t("Search for community...")}
              />
            </Container>
            <Container className="rel-pt-2 rel-pb-2">
              <ResultsLoader>
                <EmptyResults />
                <Error />
                <ResultsList />
              </ResultsLoader>
            </Container>
            <Container align="center">
              <Pagination />
            </Container>
          </Container>
        </ReactSearchKit>
      </OverridableContext.Provider>
    );
  }
}

PendingCommunitiesSearch.propTypes = {
  pendingCommunitiesEndpoint: PropTypes.string.isRequired,
};