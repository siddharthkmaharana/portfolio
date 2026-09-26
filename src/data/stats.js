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
    totalSolved: 9,
    totalQuestions: 4060,
    totalSubmissions: 11,
    acceptanceRate: '90.9%',
    breakdown: [
      { difficulty: 'Easy', solved: 6, total: 966, color: '#00b8a3' },
      { difficulty: 'Medium', solved: 2, total: 2117, color: '#ffc01e' },
      { difficulty: 'Hard', solved: 1, total: 977, color: '#ff375f' },
    ],
    recentSubmissions: [
      { title: 'Power of Three', slug: 'power-of-three', difficulty: 'Easy', time: 'Recent' },
      { title: 'Power of Two', slug: 'power-of-two', difficulty: 'Easy', time: 'Recent' },
      { title: 'Tenth Line', slug: 'tenth-line', difficulty: 'Easy', time: 'Recent' },
      { title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', time: 'Recent' },
      { title: 'Reverse Integer', slug: 'reverse-integer', difficulty: 'Medium', time: 'Recent' },
    ],
  },
}

export default statsData
