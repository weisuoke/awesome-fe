---
nav:
  title: 算法
  order: 50
group:
  title: 算法分类
  order: 20
title: 二分查找
order: 6
---

# 二分查找

二分查找是一种基于比较目标值和数组中间元素的教科书式的算法。

- 如果目标值等于中间元素，则找到目标值。
- 如果目标值较小，继续在左侧搜索。
- 如果目标值较大，则继续在右侧搜索。

算法：

- 初始化指针 left = 0, right = n - 1。
- 当 left <= right：
  - 比较中间元素 nums[pivot] 和目标值 target 。
    - 如果 target = nums[pivot]，返回 pivot。
    - 如果 target < nums[pivot]，则在左侧继续搜索 right = pivot - 1。
    - 如果 target > nums[pivot]，则在右侧继续搜索 left = pivot + 1。

**复杂度分析**

- 时间复杂度：\mathcal{O}(\log N)O(log*N*)。
- 空间复杂度：\mathcal{O}(1)O(1)。



## 源码

```java
class Solution {
  public int search(int[] nums, int target) {
    int pivot, left = 0, right = nums.length - 1;
    while (left <= right) {
      pivot = left + (right - left) / 2;
      if (nums[pivot] == target) return pivot;
      if (target < nums[pivot]) right = pivot - 1;
      else left = pivot + 1;
    }
    return -1;
  }
}
```



## LeetCode 相关题目

### Easy

- 704