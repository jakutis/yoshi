import React from 'react';
import {
  ExperimentsProvider,
  withExperiments,
  InjectedExperimentsProps,
} from '@wix/wix-experiments-react';
import { ExperimentsBag } from '@wix/wix-experiments';

import { TPAComponentsProvider } from 'wix-ui-tpa/TPAComponentsConfig';
import { Button } from 'wix-ui-tpa/Button';
import styles from './Widget.st.css';

export default class WidgetRoot extends React.Component<{
  name: string;
  mobile: boolean;
  experiments: ExperimentsBag;
}> {
  render() {
    const { name, experiments, mobile } = this.props;

    return (
      <ExperimentsProvider options={{ experiments }}>
        <TPAComponentsProvider value={{ mobile }}>
          <Widget name={name} />
        </TPAComponentsProvider>
      </ExperimentsProvider>
    );
  }
}

export const Widget = withExperiments<
  { name: string } & InjectedExperimentsProps
>(({ name, ...rest }) => {
  return (
    <div {...styles('root', {}, rest)}>
      <div className={styles.header}>
        <h2 data-testid="app-title">
          {'app.hello'} {name}!
        </h2>
      </div>
      <Button className={styles.mainButton}>click me</Button>
    </div>
  );
});
