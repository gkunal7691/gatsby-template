import React, { useState, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/entypo/plus';
import { minus } from 'react-icons-kit/entypo/minus';
import Section, { SectionHeading, RcCollapse } from './faq.style';
import { Panel } from 'rc-collapse';
import motion from './motion-util';

import 'common/assets/css/rc-collapse.css';
import 'rc-collapse/assets/index.css';

const Faq = () => {
  const [activeKey, setActiveKey] = useState(1);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  const data = useStaticQuery(graphql`
    query {
      webAppMinimalJson {
        faqs {
          id
          title
          description
        }
      }
    }
  `);

  return (
    <Section id="faq">
      <Container className="container">
        <SectionHeading>
          <Heading content="Frequently Ask Question" />
        </SectionHeading>
        <RcCollapse
          collapsible={undefined}
          accordion={true}
          activeKey={activeKey}
          onChange={onChange}
          openMotion={motion}
        >
          {data.webAppMinimalJson.faqs?.map((faq) => (
            <Panel
              key={faq.id}
              showArrow={false}
              header={
                <Fragment>
                  <Heading as="h4" content={faq.title} />
                  <span className="icon">
                    <Icon icon={minus} size={20} className="minus" />
                    <Icon icon={plus} size={20} className="plus" />
                  </span>
                </Fragment>
              }
            >
              {faq.description}
            </Panel>
          ))}
        </RcCollapse>
      </Container>
    </Section>
  );
};

export default Faq;
