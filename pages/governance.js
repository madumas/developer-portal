/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Image,
} from 'theme-ui';
import Link from 'next/link';
import useResources from 'hooks/useResources';
import SingleLayout from '../layouts/SingleLayout.js';
import GuideList from 'components/GuideList';

const content = [
  [
    'Documentation',
    '',
    () => {
      const guides = [
        'dai.js gov plugin docs',
        'data api gov queries',
        'gov documentation',
      ];

      return (
        <Box>
          {guides.map(title => {
            return (
              <Box
                key={title}
                sx={{
                  mt: 3,
                }}
              >
                <Text>{title} -> </Text>
              </Box>
            );
          })}
        </Box>
      );
    },
  ],
  [
    'Ecosystem',
    'text goes here',
    () => {
      const guides = ['mkr.gov', 'vote.makerdao.com'];

      return (
        <Flex>
          {guides.map(title => {
            return (
              <Card key={title}>
                <Heading>{title}</Heading>
                <Text>Description</Text>
              </Card>
            );
          })}
        </Flex>
      );
    },
  ],
];

const Governance = () => {
  const resources = useResources();
  const guides = resources.filter(
    r =>
      r.frontMatter.contentType === 'guide' &&
      r.frontMatter.tags.includes('governance')
  );
  return (
    <SingleLayout>
      <Container>
        <Flex
          sx={{
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Heading variant="mediumHeading">Governance</Heading>
            <Text>Participate, vote.</Text>
          </Box>
        </Flex>
        <GuideList guides={guides} />
        {content.map(([title, text, Content]) => {
          return (
            <Flex
              key={title}
              sx={{
                mb: 6,
              }}
            >
              <Box>
                <Heading>{title}</Heading>
                <Text>{text}</Text>
                <Content />
              </Box>
            </Flex>
          );
        })}
      </Container>
    </SingleLayout>
  );
};

export default Governance;
