import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Nav = styled.ul`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: grey;
  padding: 0.65em;
`;
const MenuOption = styled.li`
  background-color: white;
  color: grey;
  a {
    text-decoration: none;
    color: grey;
  }
  &:hover {
    background-color: grey;
    a {
      color: white;
    }
  }
`;

const MenuContainer = styled.li`
  margin-left: 5px;
  margin-right: 5px;
`;
const MenuHeader = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
`;

const MenuBody = styled.div`
  display: ${(props) => props.display};
  position: absolute;
  width: fit-content;
  padding-top: 1em;
`;

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState("none");
  return (
    <MenuContainer
      onMouseEnter={() => setIsOpen("block")}
      onMouseLeave={() => setIsOpen("none")}
      onClick={() => setIsOpen("none")}
    >
      <MenuHeader>
        <Link to={props.link}>{props.title}</Link>
      </MenuHeader>
      <MenuBody display={isOpen}>{props.children}</MenuBody>
    </MenuContainer>
  );
};

const Navigation = () => {
  return (
    <Nav>
      <Menu title="About" link="/about">
        <MenuOption>
          <Link to="/about">At a Glance</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/about/history">History of CTL</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/about/welcome">Welcome from Head of School</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/faculty">Faculty</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/administration">Administration</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/who/board-of-directors">Board of Directors</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/justice-equity-diversity-and-inclusion">
            Justice, Equity, Diversity and Inclusion at CTL
          </Link>
        </MenuOption>
        <MenuOption>
          <Link to="/employment">Employment</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/head-of-school-blog">Head of School Blog</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/press">CTL in the News</Link>
        </MenuOption>
        <MenuOption>
          <Link to="/strategy">Strategic Plan</Link>
        </MenuOption>
      </Menu>
    </Nav>
  );
};

export default Navigation;
