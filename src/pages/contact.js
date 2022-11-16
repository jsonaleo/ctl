import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import styled from "styled-components";

import Carousel from "../components/Carousel";
import Body from "../components/Body";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Updated = styled.div`
  position: fixed;
  bottom: 0;
  left: 1em;
  margin: 5px;
  cursor: default;
  color: grey;
`;

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyHolder = styled.div`
  background-color: #fff;
  z-index: 0;
  width: 900px;
  padding: 0 20px;
  margin-top: ${(props) => (props.coverSlideshow ? "0" : "250px")};
  transition: 0.3s;
  h1 {
    font-size: 25pt;
  }
  h2 {
    font-size: 18pt;
  }
  h3 {
    font-size: 16pt;
  }
  @media only screen and (max-width: 900px) {
    margin-top: 0;
    width: auto;
    padding: 2rem;
    img {
      max-width: 70vw;
    }
  }
`;

const Form = styled.div`
  form {
    width: 100%;
    p {
      width: 100%;
      &.double {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
      }
      &.triple {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1rem;
      }
      &.submit {
        width: 100%;
        display: flex;
        button {
          width: 120px;
          height: 2rem;
          padding: 0 1rem;
          margin: 0 auto;
          border-radius: 3px;
          border: 1px solid #234;
          background-color: #def;
          &:hover {
            background-color: #fed;
          }
          cursor: pointer;
        }
      }
      label {
        line-height: 2rem;
        span.required {
          color: red;
        }
      }
      input {
        height: 2rem;
      }
      input,
      textarea {
        width: calc(100% - 6px);
        border: 1px solid #234;
        border-radius: 3px;
        line-height: 2rem;
        font-size: 1rem;
        font-family: inherit;
      }
      textarea {
        height: 10rem;
      }
    }
  }
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const {
    title,
    date,
    carousel: { images },
  } = frontmatter;

  return (
    <Page>
      <Helmet>
        <title>CTL{title}</title>
      </Helmet>
      <Carousel images={images}></Carousel>
      <FullPage>
        <BodyHolder>
          <Body body={html} />
          <Form id="inquiry-form">
            <form name="contact" netlify>
              <p class="double">
                <label>
                  First Name{" "}
                  <input type="text" name="first-name" title="First Name" />
                </label>
                <label>
                  Last Name{" "}
                  <input type="text" name="last-name" title="Last Name" />
                </label>
              </p>
              <p>
                <label>
                  <span title="Email required">Email </span>
                  <span class="required">*</span>
                  <input type="email" name="email" required title="Email" />
                </label>
              </p>
              <p>
                <label>
                  Mailing Address{" "}
                  <input type="text" name="address" title="Mailing address" />
                </label>
              </p>
              <p class="triple">
                <label>
                  City
                  <input type="text" name="city" title="City" />
                </label>
                <label>
                  State
                  <input
                    type="text"
                    pattern="[A-Z]{2}"
                    name="state"
                    title="Two letter state code"
                  />
                </label>
                <label>
                  Zip{" "}
                  <input
                    type="text"
                    pattern="[0-9]{5}"
                    title="Five digit zip code"
                  />
                </label>
              </p>
              <p>
                <label>
                  Message <textarea name="message" title="Message" />
                </label>
              </p>
              <p class="submit">
                <button type="submit">Send</button>
              </p>
            </form>
          </Form>
        </BodyHolder>
      </FullPage>
      <Updated title={`Last updated - ${date}`}>&Delta;</Updated>
    </Page>
  );
}

export const pageQuery = graphql`
  query {
    markdownRemark(frontmatter: { contactpage: { eq: true } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        carousel {
          images
        }
      }
    }
  }
`;
