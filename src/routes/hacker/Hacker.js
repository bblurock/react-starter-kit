/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes, Component } from 'react';
import ReactFireMixin from 'reactfire'
import firebase from 'firebase'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Hacker.css';
import { connect } from 'react-redux';
import { setHackerNewsItem } from '../../actions/hacker'

const title = 'Hacker News';

firebase.initializeApp({
  apiKey: "AIzaSyC8vv7luJPyO2VCQAmkCmseZi5Ktwo3l7g",
  databaseURL: "https://hacker-news.firebaseio.com/",
  authDomain: "reacthackernews.firebaseapp.com",
  storageBucket: "reacthackernews.appspot.com",
})

const HackerNews = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      items: {}
    };
  },

  getNewsJsx: function (item) {
    return (
      <li className={s.news} key={item.id}>
        <h3 className={s.newsTitle}>
          { item.text ? item.text : <a href={item.url}>{item.url}</a> }</h3>
        <p className={s.newsInfo}>{item.by} | {item.type}</p>
      </li>
    )
  },

  componentDidMount: function () {
    const ref = firebase.database().ref("v0");
    const topstories = ref.child('topstories').limitToLast(25);

    topstories.on('value', snapshot => {
      snapshot.forEach(data => {
        const key = data.getKey();
        const binding = ref.child(`item/${key}`);

        binding.on('value', snapshot => {
          this.props.setHackerNewsItem({
            id: snapshot.getKey(),
            data: snapshot.val(),
          })
        });
      });
    });

  },

  render: function () {
    const { items } = this.props;
    this.context.setTitle(title);
    console.log(items);
    return (
      <div className={s.root}>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Hacker News</h1>
          <p className={s.bannerDesc}>Hot and Latest news</p>
        </div>
        <div className={s.container}>
          <ul className={s.newsList}>
            { Object.keys(items).map(k => this.getNewsJsx(items[k])) }
          </ul>
        </div>
      </div>
    );
  }
})

HackerNews.contextTypes = { setTitle: PropTypes.func.isRequired };

const mapStatesToProps = state => ({
  items: state.hacker
})

export default connect(mapStatesToProps, {
  setHackerNewsItem
})(withStyles(s)(HackerNews));
