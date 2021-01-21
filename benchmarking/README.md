## Set up
* `yarn`
* `yarn benchmark`

## Configuration
`./config/index.js`

Especial attention to modify `provider.node` and `benchmark.senderSecretSeed`

## Output example

```
------------------------------ Test #1 ----------------------------------
============== Block: #174637 ===============
Processed        1829
Pending          6288

Total Received   8117
Total Processed  1829


TPS: 76.21 with 99.96%
============== Block: #174638 ===============
Processed        75
Pending          6288

Total Received   8192
Total Processed  1904


TPS: 12.5 with 76.76%
============== Block: #174639 ===============
Processed        1822
Pending          4466

Total Received   8192
Total Processed  3726
```