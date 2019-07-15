import React from 'react';
import { graphql } from 'gatsby';

import Component from '../components/Component';
import Layout from '../components/Layout';
import ReadMoreLink from '../components/ReadMoreLink';
import SEO from '../components/SEO';
import SearchForm from '../components/SearchForm';

const IndexPage = ({ data }) => (
  <Layout
    heroComponent={
      <div className="my-8 lg:my-12">
        <div className="container">
          <SearchForm />
        </div>
      </div>
    }
  >
    <SEO title="Home" />
    {/* <div
      className="body-text"
      dangerouslySetInnerHTML={{
        __html: data.markdown.html
      }}
    /> */}
    <h2 className="mt-8 bg-squiggle-blue-400 bg-repeat-x bg-bottom px-2 -mx-2 pb-4">
      Recently updated components
    </h2>
    <ul className="flex flex-wrap mt-2 -mx-4">
      {data.recentComponents.edges.map(
        (
          {
            node: {
              data: { slug, name, description, otherNames, examplesCount }
            }
          },
          i
        ) => (
          <li key={i} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <Component
              slug={slug}
              name={name}
              description={
                description !== null && description.childMarkdownRemark.html
              }
              otherNames={otherNames}
              examplesCount={examplesCount}
              headingLevel="h3"
            />
          </li>
        )
      )}
    </ul>
    <div className="text-right">
      <ReadMoreLink to="/components" text="View all components" />
    </div>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  {
    allComponents: allAirtable(filter: { table: { eq: "Components" } }) {
      totalCount
    }
    allComponentExamples: allAirtable(
      filter: { table: { eq: "Component examples" } }
    ) {
      totalCount
    }
    allDesignSystems: allAirtable(filter: { table: { eq: "Design systems" } }) {
      totalCount
    }
    recentComponents: allAirtable(
      filter: {
        table: { eq: "Components" }
        data: { Publish: { eq: true }, Date_updated: { ne: null } }
      }
      sort: { fields: [data___Date_updated], order: DESC }
      limit: 6
    ) {
      edges {
        node {
          data {
            name: Name
            description: Description {
              childMarkdownRemark {
                html
              }
            }
            slug: Slug
            otherNames: Other_names
            examplesCount: Examples_count
          }
        }
      }
    }
    markdown: markdownRemark(frontmatter: { slug: { eq: "homepage" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
