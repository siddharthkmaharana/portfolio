/**
 * STATS, GITHUB & LEETCODE DATA
 * Contains real GitHub streak and LeetCode submission data and metadata.
 */

import githubRealStreak from '../github-real-streak.json'

export const statsData = {
  githubUsername: 'siddharthkmaharana',
  githubProfileUrl: 'https://github.com/siddharthkmaharana',
  realStreak: githubRealStreak,

  leetcode: {
    username: 'siddharthkmleetcode',
    profileUrl: 'https://leetcode.com/u/siddharthkmleetcode/',
    totalSolved: 11,
    totalQuestions: 4060,
    totalSubmissions: 14,
    acceptanceRate: '78.6%',
    submissionCalendar: {
      '2026-07-10': 2,
      '2026-07-15': 2,
      '2026-07-16': 1,
      '2026-08-15': 1,
      '2026-08-16': 1,
      '2026-09-02': 1,
      '2026-09-14': 1,
      '2026-09-16': 1,
      '2026-09-19': 1,
      '2026-11-01': 2,
      '2026-11-02': 1,
    },
    breakdown: [
      { difficulty: 'Easy', solved: 8, total: 966, color: '#00b8a3' },
      { difficulty: 'Medium', solved: 2, total: 2117, color: '#ffc01e' },
      { difficulty: 'Hard', solved: 1, total: 977, color: '#ff375f' },
    ],
    recentSubmissions: [
      { title: 'Longest Common Prefix', slug: 'longest-common-prefix', difficulty: 'Easy', time: 'Recent' },
      { title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'Easy', time: 'Recent' },
      { title: 'Power of Three', slug: 'power-of-three', difficulty: 'Easy', time: 'Recent' },
      { title: 'Power of Two', slug: 'power-of-two', difficulty: 'Easy', time: 'Recent' },
      { title: 'Tenth Line', slug: 'tenth-line', difficulty: 'Easy', time: 'Recent' },
      { title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', time: 'Recent' },
      { title: 'Reverse Integer', slug: 'reverse-integer', difficulty: 'Medium', time: 'Recent' },
    ],
  },
}

export default statsData
