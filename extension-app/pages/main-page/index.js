import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Tabs, HelpPageBuilder } from 'sms-sdk-toolbox-ui';
import NotificationPageContainer from 'pages/notification-manage/container';
import InstanceManagePage from 'pages/instance-page';
import { BookBookmark, Bookmark } from 'styled-icons/boxicons-regular';

const StyledBookBookmarkIcon = styled(BookBookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyledBookmarkIcon = styled(Bookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [
    {
      title: 'How to create an Instance',
      description: 'how to create an Mocked Instance',
      icon: <StyledBookBookmarkIcon size={32} />,
      topics: [
        {
          id: '0_1',
          title: 'Creating an Instance',
          description: 'A guide on how to create an Instnace',
          icon: <StyledBookmarkIcon />,
          contents: [
            {
              title: 'Step 1',
              description: 'Go to the Manage Notifications Tab',
              imageUrl: 'https://picsum.photos/640/480',
            },
            {
              title: 'Step 2',
              description: 'Click the Create Notification button',
              imageUrl: 'https://picsum.photos/640/480',
            },
            {
              title: 'Step 3',
              description: 'On the Create Notification page fill the form and press Create',
              imageUrl: 'https://picsum.photos/640/480',
            },
          ],
        },
      ],
    },
    {
      id: '1_0',
      title: 'How to List Instances',
      description: 'A guide on how to list Active Instances',
      icon: <StyledBookBookmarkIcon size={32} />,
      contents: [
        {
          title: 'Step 1',
          description: 'Go to the Instances Tab',
          imageUrl: 'https://picsum.photos/640/480',
        },
      ],
      relatedContent: [
        {
          id: '0_1',
          title: 'How to create an Instance',
        },
      ],
    },
  ],
};

const MainPage = (props) => {
  const { instances, chosenTab } = props;

  return (
    <Box space={20}>
      <Box horizontal space={60} style={{ maxWidth: '50rem' }}>
        <Tabs activeTab={chosenTab}>
          <div label="Instances">
            <InstanceManagePage instances={instances} />
          </div>
          <div label="Notifications">
            <NotificationPageContainer instances={instances} />
          </div>
          <div label="Help" align="right">
            <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
          </div>
        </Tabs>
      </Box>
    </Box>
  );
};

MainPage.propTypes = {
  instances: PropTypes.array,
  chosenTab: PropTypes.number,
};

MainPage.defaultProps = {
  instances: null,
  chosenTab: 0,
};

export default MainPage;