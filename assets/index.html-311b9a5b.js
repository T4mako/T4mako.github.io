const e=JSON.parse('{"key":"v-297f1e25","path":"/code/python/Machine%20Learning/Deep%20Learning/","title":"深度学习","lang":"zh-CN","frontmatter":{"date":"2024-11-20T00:00:00.000Z","description":"深度学习 1、预备知识 https://zh.d2l.ai/chapter_preliminaries/index.html 基础概念 梯度下降、误差、k 折交叉验证、过拟合与欠拟合、损失函数、向前传播、反向传播、计算图、激活函数 权重衰退： 使用均方范数作为硬性限制，控制模型复杂度，减少过拟合 通过限制参数值 w 的选择范围来控制模型容量∣∣w∣∣2≤θ||w||^2 \\\\le \\\\theta∣∣w∣∣2≤θ ，通常不限制 bias，小的 theta 意味着更强的正则项","head":[["meta",{"property":"og:url","content":"https://T4mako.github.io/code/python/Machine%20Learning/Deep%20Learning/"}],["meta",{"property":"og:site_name","content":"T4mako"}],["meta",{"property":"og:title","content":"深度学习"}],["meta",{"property":"og:description","content":"深度学习 1、预备知识 https://zh.d2l.ai/chapter_preliminaries/index.html 基础概念 梯度下降、误差、k 折交叉验证、过拟合与欠拟合、损失函数、向前传播、反向传播、计算图、激活函数 权重衰退： 使用均方范数作为硬性限制，控制模型复杂度，减少过拟合 通过限制参数值 w 的选择范围来控制模型容量∣∣w∣∣2≤θ||w||^2 \\\\le \\\\theta∣∣w∣∣2≤θ ，通常不限制 bias，小的 theta 意味着更强的正则项"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"T4mako"}],["meta",{"property":"article:published_time","content":"2024-11-20T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深度学习\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-20T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"T4mako\\",\\"url\\":\\"https://github.com/T4mako/T4mako.github.io\\"}]}"]]},"headers":[{"level":2,"title":"1、预备知识","slug":"_1、预备知识","link":"#_1、预备知识","children":[{"level":3,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[]},{"level":3,"title":"数据集操作","slug":"数据集操作","link":"#数据集操作","children":[]},{"level":3,"title":"硬件、计算性能","slug":"硬件、计算性能","link":"#硬件、计算性能","children":[]},{"level":3,"title":"微调","slug":"微调","link":"#微调","children":[]},{"level":3,"title":"困惑度 perplexity","slug":"困惑度-perplexity","link":"#困惑度-perplexity","children":[]},{"level":3,"title":"梯度剪裁","slug":"梯度剪裁","link":"#梯度剪裁","children":[]}]},{"level":2,"title":"2、线性神经网络","slug":"_2、线性神经网络","link":"#_2、线性神经网络","children":[{"level":3,"title":"线性回归","slug":"线性回归","link":"#线性回归","children":[]},{"level":3,"title":"Softmax 分类","slug":"softmax-分类","link":"#softmax-分类","children":[]},{"level":3,"title":"多层感知机 MLP","slug":"多层感知机-mlp","link":"#多层感知机-mlp","children":[]}]},{"level":2,"title":"3、卷积神经网络 CNN","slug":"_3、卷积神经网络-cnn","link":"#_3、卷积神经网络-cnn","children":[{"level":3,"title":"多输入输出通道","slug":"多输入输出通道","link":"#多输入输出通道","children":[]},{"level":3,"title":"卷积层 conv（convolution）","slug":"卷积层-conv-convolution","link":"#卷积层-conv-convolution","children":[]},{"level":3,"title":"池化层 pool","slug":"池化层-pool","link":"#池化层-pool","children":[]},{"level":3,"title":"全连接层 fc","slug":"全连接层-fc","link":"#全连接层-fc","children":[]}]},{"level":2,"title":"4、经典卷积神经网络","slug":"_4、经典卷积神经网络","link":"#_4、经典卷积神经网络","children":[{"level":3,"title":"LeNet （1980s）","slug":"lenet-1980s","link":"#lenet-1980s","children":[]},{"level":3,"title":"AlexNet（2012 年）","slug":"alexnet-2012-年","link":"#alexnet-2012-年","children":[]},{"level":3,"title":"Vgg（2014 年）","slug":"vgg-2014-年","link":"#vgg-2014-年","children":[]},{"level":3,"title":"NiN","slug":"nin","link":"#nin","children":[]},{"level":3,"title":"GoogLeNet","slug":"googlenet","link":"#googlenet","children":[]},{"level":3,"title":"Resnet（2015年）","slug":"resnet-2015年","link":"#resnet-2015年","children":[]},{"level":3,"title":"DenseNet","slug":"densenet","link":"#densenet","children":[]}]},{"level":2,"title":"5、批量归一化层","slug":"_5、批量归一化层","link":"#_5、批量归一化层","children":[]},{"level":2,"title":"6、循环神经网络 RNN","slug":"_6、循环神经网络-rnn","link":"#_6、循环神经网络-rnn","children":[]},{"level":2,"title":"7、经典循环神经网络","slug":"_7、经典循环神经网络","link":"#_7、经典循环神经网络","children":[{"level":3,"title":"RGN","slug":"rgn","link":"#rgn","children":[]},{"level":3,"title":"LSTM","slug":"lstm","link":"#lstm","children":[]},{"level":3,"title":"深度循环神经网络","slug":"深度循环神经网络","link":"#深度循环神经网络","children":[]},{"level":3,"title":"双向循环神经网络","slug":"双向循环神经网络","link":"#双向循环神经网络","children":[]},{"level":3,"title":"编码器-解码器架构","slug":"编码器-解码器架构","link":"#编码器-解码器架构","children":[]},{"level":3,"title":"seq2seq","slug":"seq2seq","link":"#seq2seq","children":[]}]},{"level":2,"title":"8、注意力机制","slug":"_8、注意力机制","link":"#_8、注意力机制","children":[{"level":3,"title":"注意力机制","slug":"注意力机制","link":"#注意力机制","children":[]},{"level":3,"title":"自注意力机制 slef-attention","slug":"自注意力机制-slef-attention","link":"#自注意力机制-slef-attention","children":[]}]},{"level":2,"title":"9、Transformer","slug":"_9、transformer","link":"#_9、transformer","children":[{"level":3,"title":"1. Positional Encoding","slug":"_1-positional-encoding","link":"#_1-positional-encoding","children":[]},{"level":3,"title":"2、自注意力机制 Self Attention Mechanism","slug":"_2、自注意力机制-self-attention-mechanism","link":"#_2、自注意力机制-self-attention-mechanism","children":[]},{"level":3,"title":"3、Multi-Head Attention 多头注意力","slug":"_3、multi-head-attention-多头注意力","link":"#_3、multi-head-attention-多头注意力","children":[]},{"level":3,"title":"4、残差连接和 Layer Normalization","slug":"_4、残差连接和-layer-normalization","link":"#_4、残差连接和-layer-normalization","children":[]},{"level":3,"title":"5、Transformer Encoder 整体结构","slug":"_5、transformer-encoder-整体结构","link":"#_5、transformer-encoder-整体结构","children":[]}]}],"readingTime":{"minutes":15.92,"words":4777},"filePathRelative":"code/python/Machine Learning/Deep Learning/index.md","localizedDate":"2024年11月20日","excerpt":"<h1> 深度学习</h1>\\n<h2> 1、预备知识</h2>\\n<p><a href=\\"https://zh.d2l.ai/chapter_preliminaries/index.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://zh.d2l.ai/chapter_preliminaries/index.html</a></p>\\n<h3> 基础概念</h3>\\n<p>梯度下降、误差、k 折交叉验证、过拟合与欠拟合、损失函数、向前传播、反向传播、计算图、激活函数</p>\\n<p>权重衰退：</p>\\n<ul>\\n<li>使用均方范数作为硬性限制，控制模型复杂度，减少过拟合<br>\\n通过限制参数值 w 的选择范围来控制模型容量<span class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi mathvariant=\\"normal\\">∣</mi><mi mathvariant=\\"normal\\">∣</mi><mi>w</mi><mi mathvariant=\\"normal\\">∣</mi><msup><mi mathvariant=\\"normal\\">∣</mi><mn>2</mn></msup><mo>≤</mo><mi>θ</mi></mrow><annotation encoding=\\"application/x-tex\\">||w||^2 \\\\le  \\\\theta</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1.0641em;vertical-align:-0.25em;\\"></span><span class=\\"mord\\">∣∣</span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.02691em;\\">w</span><span class=\\"mord\\">∣</span><span class=\\"mord\\"><span class=\\"mord\\">∣</span><span class=\\"msupsub\\"><span class=\\"vlist-t\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.8141em;\\"><span style=\\"top:-3.063em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\">2</span></span></span></span></span></span></span></span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">≤</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6944em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.02778em;\\">θ</span></span></span></span> ，通常不限制 bias，小的 theta 意味着更强的正则项</li>\\n</ul>","autoDesc":true}');export{e as data};