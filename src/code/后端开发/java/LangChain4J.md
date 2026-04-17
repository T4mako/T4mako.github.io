---
title: LangChain4j 

---
##  1、LangChain4j 

主要功能：

- 与 **大型语言模型** 和 **向量数据库** 的便捷交互   
  通过统一的应用程序编程接口（API），可以轻松访问所有主要的商业和开源大型语言模型以及向量数据
  库，使你能够构建聊天机器人、智能助手等应用
- 专为 Java 打造  
借助Spring Boot 集成，能够将大模型集成到ava 应用程序中。大型语言模型与 Java 之间实现了双向集成：你可以从 Java 中调用大型语言模型，同时也允许大型语言模型反过来调用你的 Java 代码
- 智能代理、工具、检索增强生成（RAG）  
为常见的大语言模型操作提供了广泛的工具，涵盖从底层的提示词模板创建、聊天记忆管理和输出解析，到智能代理和检索增强生成等高级模式。  

[LangChain4j 文档](https://docs.langchain4j.dev/get-started  )

LangChain4j 具有模块化设计，包括：

1. langchain4j-core 模块， 它定义了核心抽象概念（如聊天语言模型和嵌入存储）及其 API。
2. 主 langchain4j 模块，包含有用的工具，如文档加载器、聊天记忆实现，以及诸如人工智能服务等高层功能。

3. 大量的 langchain4j-{集成} 模块，每个模块都将各种大语言模型提供商和嵌入存储集成到 LangChain4j 中。你可以独立使用 langchain4j-{成} 模块。如需更多功能，只需导入主 langchain4j依赖项即可。  

### SpringBoot 中的使用

https://docs.langchain4j.dev/tutorials/spring-boot-integration  

依赖

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
    <version>1.1.0-beta7</version>
</dependency>
```

配置模型参数：

```properties
#langchain4j测试模型
langchain4j.open-ai.chat-model.api-key=demo
langchain4j.open-ai.chat-model.model-name=gpt-4o-mini

#请求和响应日志
langchain4j.open-ai.chat-model.log-requests=true
langchain4j.open-ai.chat-model.log-responses=true

#启用日志 debug 级别
logging.level.root=debug
```

测试

```java
@SpringBootTest
public class LLMTest {

    @Test
    public void testGptDemo(){
        OpenAiChatModel model = OpenAiChatModel.builder()
                .baseUrl("http://langchain4j.dev/demo/openai/v1")
                .apiKey("demo")
                .modelName("gpt-4o-mini")
                .build();
        String answer = model.chat("hello");
        System.out.println(answer);
    }
}
```

## 2、其他大模型的接入

模型排行榜：https://superclueai.com/

LangChain4j支持接入的大模型： https://docs.langchain4j.dev/integrations/language-models/  

### DeepSeek

### ollama

本地部署

- 下载并安装 ollama： OllamaSetup.exe  
- 选择要部署的模型， 模型列表： https://ollama.com/search  
- cmd 执行命令： ollama run deepseek-r1:1.5 运行大模型。如果是第一次运行则会先下载大模型  

ollama 依赖

- 参考文档： https://docs.langchain4j.dev/integrations/language-models/ollama#get-started  

- ```xml
  <!-- 接入ollama -->
  <dependency>
  <groupId>dev.langchain4j</groupId>
  <artifactId>langchain4j-ollama-spring-boot-starter</artifactId>
  </dependency>
  ```

配置模型参数  

```properties
#ollama
langchain4j.ollama.chat-model.base-url=http://localhost:11434
langchain4j.ollama.chat-model.model-name=deepseek-r1:1.5b
langchain4j.ollama.chat-model.log-requests=true
langchain4j.ollama.chat-model.log-responses=true
```

### 接入阿里百炼平台  （通义千问）

## 3、人工智能服务 AIService  

AIService使用面向接口和动态代理的方式完成程序的编写，更灵活的实现高级功能  

- 链 Chain（旧版）  

  链的概念源自 Python 中的 LangChain。其理念是针对每个常见的用例都设置一条链，比如聊天机器人、检索增强生成（RAG）等。链将多个底层组件组合起来，并协调它们之间的交互。链存在的主要问题是不灵活，我们不进行深入的研究

- 人工智能服务 AIService  

  - 为大语言模型格式化输入内容  
  - 解析大语言模型的输出结果 
  - 聊天记忆 Chat memory  
  - 工具 Tools  
  - 检索增强生成 RAG  

### 3.1、创建 AIService

引入依赖

```xml
<!--langchain4j高级功能-->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-spring-boot-starter</artifactId>
</dependency>
```

创建接口

```java
public interface Assistant {
	String chat(String userMessage);
}
```

编写测试用例

```java
@SpringBootTest
public class AIServiceTest {

    @Autowired
    private OpenAiChatModel openAiChatModel;

    @Test
    public void testChat() {
        Assistant assistant = AiServices.create(Assistant.class, openAiChatModel);
        String chat = assistant.chat("你是谁");
        System.out.println(chat);
    }

}
```

### 3.2、@AIService

使用 @AIService 注解创建 Assistant 接口

```java
@AiService
public interface Assistant {
    String chat(String userMessage);
}
```

调用

```java
@Autowired
private Assistant assistant;
@Test
public void testAssistant(){
    String chat = assistant.chat("hello");
    System.out.println(chat);
}
```

如果配置了多个模型，在 @AiService 中指定模型：

```java
@AiService(wiringMode = EXPLICIT, chatModel = "qwenChatModel")
```

AiServices 会组装 Assistant 接口以及其他组件，并使用反射机制创建一个实现 Assistant 接口的代理对象。这个代理对象会处理输入和输出的所有转换工作。在这个例子中， chat 方法的输入是一个字符串，但是大模型需要一个 UserMessage 对象。所以，代理对象将这个字符串转换为 UserMessage ，并调用聊天语言模型。 chat 方法的输出类型也是字符串，但是大模型返回的是 AiMessage 对象，代理对象会将其转换
为字符串。

简单理解就是：**代理对象的作用是输入转换和输出转换**  

## 4、聊天记忆 Chat memory

目前的接入方式，大模型是没有记忆的（接口级别的直接调用没有记忆保存）

聊天记忆的简单实现（拼接之前的对话）：

```java
@Autowired
private QwenChatModel qwenChatModel; 
@Test
public void testChatMemory2() {
    //第一轮对话
    UserMessage userMessage1 = UserMessage.userMessage("我是ABC");
    ChatResponse chatResponse1 = qwenChatModel.chat(userMessage1);
    AiMessage aiMessage1 = chatResponse1.aiMessage();
    
    //输出大语言模型的回复
    System.out.println(aiMessage1.text());
    
    //第二轮对话
    UserMessage userMessage2 = UserMessage.userMessage("你知道我是谁吗");
    ChatResponse chatResponse2 = qwenChatModel.chat(Arrays.asList(userMessage1,
    aiMessage1, userMessage2));
    AiMessage aiMessage2 = chatResponse2.aiMessage();
    
    //输出大语言模型的回复
    System.out.println(aiMessage2.text());
}
```

### 4.1、使用 AIService 实现聊天记忆

AIService 由多个组件（大模型，聊天记忆 等）组成的时候，我们就可以称他为 **智能体** 了  

创建 MemoryChatAssistant 智能体

```java
@AiService(
        wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        chatMemory = "chatMemory"
)
public interface MemoryChatAssistant {
    String chat(String userMessage);
}
```

配置 ChatMemory  

```java
@Configuration
public class MemoryChatAssistantConfig {
    @Bean
    ChatMemory chatMemory() {
        //设置聊天记忆记录的 message 数量
        return MessageWindowChatMemory.withMaxMessages(10);
    }
}
```

### 4.2、Chat memory 聊天记忆隔离

创建记忆隔离对话智能体

```java
@AiService(
        wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        chatMemoryProvider = "chatMemoryProvider"
)
public interface SeparateChatAssistant {
    String chat(@MemoryId int memoryId, @UserMessage String userMessage);
}
```

配置ChatMemoryProvider  

```java
@Configuration
public class SeparateChatAssistantConfig {
    @Bean
    ChatMemoryProvider chatMemoryProvider() {
        return memoryId -> MessageWindowChatMemory.builder()
                .id(memoryId)
                .maxMessages(10)
                .build();
    }
}
```

测试

```JAVA
@Autowired
private SeparateChatAssistant separateChatAssistant;
@Test
public void testChatMemory5() {
    String answer1 = separateChatAssistant.chat(1,"我是Liya");
    System.out.println(answer1);
    String answer2 = separateChatAssistant.chat(1,"我是谁");
    System.out.println(answer2);
    String answer3 = separateChatAssistant.chat(2,"我是谁");
    System.out.println(answer3);
}
```

## 5、持久化聊天记忆  Persistence  

### 5.1、MongoDB 的介绍与使用

MongoDB 是一个基于文档的 NoSQL 数据库  

MongoDB使用集合（Collections）来组织文档（Documents），每个文档都是由键值对组成的。

- 数据库（Database） ：存储数据的容器，类似于关系型数据库中的数据库。
- 集合（Collection） ：数据库中的一个集合，类似于关系型数据库中的表。
- 文档（Document） ：集合中的一个数据记录，类似于关系型数据库中的行（row），以 BSON 格式存储。  

MongoDB 下载：

- 服务器： mongodb-windows-x86_64-8.0.6-signed.msi https://www.mongodb.com/try/download/community
- 命令行客户端 ： mongosh-2.5.0-win32-x64.zip https://www.mongodb.com/try/download/shell
- 图形客户端： mongodb-compass-1.39.3-win32-x64.exe https://www.mongodb.com/try/download/compass  

Mongosh 的使用：

- cmd 启动：mongosh
- 连接到 MongoDB 服务器：mongosh --host \<hostname>:\<port>

MongoDB 整合 SpringBoot

- MongoDB依赖：

  ```xml
  <!-- Spring Boot Starter Data MongoDB -->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-mongodb</artifactId>
  </dependency>
  ```

- 添加远程连接配置：  

  ```properties
  #MongoDB连接配置
  spring.data.mongodb.uri=mongodb://localhost:27017/chat_memory_db
  ```

### 5.2、持久化聊天

实体类  

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("chat_messages")
public class ChatMessages {
    //唯一标识， 映射到 MongoDB 文档的 _id 字段
    @Id
    private ObjectId id;
    private int messageId;
    private String content; //存储当前聊天记录列表的 json 字符串
}
```

持久化类 （创建一个类实现 ChatMemoryStore 接口  ）

```java
@Component
public class MongoChatMemoryStore implements ChatMemoryStore {
    @Autowired
    private MongoTemplate mongoTemplate;
    
    @Override
    public List<ChatMessage> getMessages(Object memoryId) {
        Criteria criteria = Criteria.where("memoryId").is(memoryId);
        Query query = new Query(criteria);
        ChatMessages chatMessages = mongoTemplate.findOne(query, ChatMessages.class);
        if(chatMessages == null) return new LinkedList<>();
        return ChatMessageDeserializer.messagesFromJson(chatMessages.getContent());
    } 
    
    @Override
    public void updateMessages(Object memoryId, List<ChatMessage> messages) {
        Criteria criteria = Criteria.where("memoryId").is(memoryId);
        Query query = new Query(criteria);
        Update update = new Update();
        update.set("content", ChatMessageSerializer.messagesToJson(messages));
        //根据query条件能查询出文档， 则修改文档； 否则新增文档
        mongoTemplate.upsert(query, update, ChatMessages.class);
    } 
    
    @Override
    public void deleteMessages(Object memoryId) {
        Criteria criteria = Criteria.where("memoryId").is(memoryId);
        Query query = new Query(criteria);
        mongoTemplate.remove(query, ChatMessages.class);
    }
}
```

在 SeparateChatAssistantConfig 中，添加 MongoChatMemoryStore 对象的配置  

```java
@Configuration
public class SeparateChatAssistantConfig {
    //注入持久化对象
    @Autowired
    private MongoChatMemoryStore mongoChatMemoryStore;
    
    @Bean
    ChatMemoryProvider chatMemoryProvider() {
        return memoryId -> MessageWindowChatMemory.builder()
                            .id(memoryId)
                            .maxMessages(10)
                            .chatMemoryStore(mongoChatMemoryStore) // 配置持久化对象
                            .build();
    }
}
```

## 6、提示词 Prompt

### 6.1、系统提示词

使用 **@SystemMessage** 设定角色，塑造AI助手的专业身份，明确助手的能力范围  

在 SeparateChatAssistant 类的 chat 方法上添加 **@SystemMessage** 注解  

@SystemMessage 的内容将在后台转换为 SystemMessage 对象，并与 UserMessage 一起发送给大语言模型（LLM）。SystemMessaged 的内容只会发送给大模型一次。 如果修改了SystemMessage 的内容，新的 SystemMessage 会被发送给大模型，覆盖之前的 SystemMessage

> 如果要显示今天的日期，我们需要在提示词中添加当前日期的占位符 **{{current_date}}**  

```java
@AiService(
        wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        chatMemoryProvider = "chatMemoryProvider"
)
public interface SeparateChatAssistant {
    @SystemMessage("你是我的好朋友，请用东北话回答问题。")//系统消息提示词
    String chat(@MemoryId int memoryId, @UserMessage String userMessage);
}
```

@SystemMessage 注解还可以从资源中加载提示模板：  

```java
@SystemMessage(fromResource = "my-prompt-template.txt")
String chat(@MemoryId int memoryId, @UserMessage String userMessage);
```

也可以将 @SystemMessage 和 **@V** 结合使用，**@V** 可以明确指定传递的参数名称    

```java
@SystemMessage(fromResource = "my-prompt-template3.txt")
String chat3(
    @MemoryId int memoryId,
    @UserMessage String userMessage,
    @V("username") String username,
    @V("age") int age
);
```

创建提示词模板my-prompt-template3.txt，添加占位符  

```txt
你是我的好朋友， 我是{{username}}， 我的年龄是{{age}}， 请用东北话回答问题， 回答问题的时候适当添加表情符号。
今天是 {{current_date}}。
```

测试

```java
@Test
public void testUserInfo() {
    String answer = separateChatAssistant.chat3(1, "我是谁， 我多大了", "翠花", 18);
    System.out.println(answer);
}
```



### 6.2、用户提示词模板

**@UserMessage**： 获取用户输入  

在 MemoryChatAssistant 的 chat 方法中添加注解 

```java
@AiService(
        wiringMode = EXPLICIT,
        chatModel = "openAiChatModel",
        chatMemory = "chatMemory"
)
public interface MemoryChatAssistant {
    @UserMessage("你是我的好朋友， 请用上海话回答问题， 并且添加一些表情符号。 {{it}}") //{{it}}表示这里唯一的参数的占位符。该占位符为 message 的值
    String chat(String message);
}
```

**@V** 可以明确指定传递的参数名称  

```java
@UserMessage("你是我的好朋友， 请用上海话回答问题， 并且添加一些表情符号。 {{message}}")
String chat(@V("message") String userMessage); 

@UserMessage("你是我的好朋友， 请用粤语回答问题。 {{message}}")
String chat2(@MemoryId int memoryId, @V("message") String userMessage);// 将 @V 的 message 注入到 Usermessage 中
```

## 7、Function Calling/Tools 函数调用

Function Calling 函数调用 也叫 Tools 工具。大模型在一些任务时，需要调用一些外部工具。其本质也是prompt

例如，大语言模型本身并不擅长数学运算。如果应用场景中偶尔会涉及到数学计算，我们可以为他提供一个 “数学工具”。当我们提出问题时，大语言模型会判断是否使用某个工具。  

用 @Tool 注解的方法：  

- 既可以是静态的，也可以是非静态的
- 可以具有任何可见性（公有、私有等）

```java
@Component
public class CalculatorTools {
    @Tool
    double sum(double a, double b) {
        System.out.println("调用加法运算");
        return a + b;
	} 
	@Tool
	double squareRoot(double x) {
        System.out.println("调用平方根运算");
        return Math.sqrt(x);
    }
}
```

配值工具类 

在SeparateChatAssistant中添加tools属性配置  

```java
@AiService(
    wiringMode = EXPLICIT,
    chatModel = "qwenChatModel",
    chatMemoryProvider = "chatMemoryProvider",
    tools = "calculatorTools" //配置tools
)
```

测试工具类

```java
String answer = separateChatAssistant.chat(1, "1+2等于几， 475695037565的平方根是多少？");
//答案： 3， 689706.4865
System.out.println(answer);
```

**@Tool** 注解有两个可选字段：  

- **name**（工具名称） ：工具的名称。如果未提供该字段，方法名会作为工具的名称  
- **value**（工具描述） ：工具的描述信息

根据工具的不同，即使没有任何描述，大语言模型可能也能很好地理解它（例如， add(a, b) 就很直观），但通常最好提供清晰且有意义的名称和描述。这样，大语言模型就能获得更多信息，以决定是否调用给定的工具以及如何调用  

**@P** 注解有两个字段：  

- value：参数的描述信息，这是必填字段。
- required：表示该参数是否为必需项，默认值为 true ，此为可选字段  

如果 AIService 方法中有一个参数使用 @MemoryId 注解，那么你也可以使用 @ToolMemoryId 注解

@Tool 方法中的一个参数。提供给 AIService 方法的值将自动传递给 @Tool 方法。如果你有多个用户，或每个用户有多个聊天记忆，并且希望在 @Tool 方法中对它们进行区分，那么这个功能会很有用。  

```java
public class CalculatorTools {
    @Tool(name = "加法", value = "返回两个参数相加之和")
    double sum(
            @ToolMemoryId int memoryId,
            @P(value="加数1", required = true) double a,
            @P(value="加数2", required = true) double b) {
        System.out.println("调用加法运算 " + memoryId);
        return a + b;
    } 
    @Tool(name = "平方根", value = "返回给定参数的平方根")
    double squareRoot(@ToolMemoryId int memoryId, double x) {
        System.out.println("调用平方根运算 " + memoryId);
        return Math.sqrt(x);
    }
}
```

## 8、检索增强生成 RAG  

### 8.1、RAG 与微调

LLM 的知识仅限于它所训练的数据。 如果想让 LLM 了解特定领域的知识或专有数据，可以：

- 使用 **RAG**
- 使用你的数据 **微调** LLM
- 结合 **RAG** 和 **微调**  

**微调** 大模型：在现有大模型的基础上，使用小规模的特定任务数据进行再次训练，调整模型参数，让模型更精确地处理特定领域或任务的数据。更新需重新训练，计算资源和时间成本高。

- 优点：一次会话只需一次模型调用，速度快，在特定任务上性能更高，准确性也更高。
- 缺点：知识更新不及时，模型训成本高、训练周期长。
- 应用场景：适合知识库稳定、对生成内容准确性和风格要求高的场景，如对上下文理解和语言生成质量要求高的文学创作、专业文档生成等  

**RAG（检索增强生成）**：

将原始问题以及提示词信息发送给大语言模型之前，先通过外部知识库检索相关信息，然后将检索结果和原始问题一起发送给大模型，大模型依据外部知识库再结合自身的训练数据，组织自然语言回答问题。通过这种方式，大语言模型可以获取到特定领域的相关信息，并能够利用这些信息进行回复。

- 优点：数据存储在外部知识库，可以实时更新，不依赖对模型自身的训练，成本更低。
- 缺点：需要两次查询：先查询知识库，然后再查询大模型，性能不如微调大模型
- 应用场景：适用于知识库规模大且频繁更新的场景，如企业客服、实时新闻查询、法律和医疗领域的最新知识问答等。  

 RAG 常用方法：

- **全文（关键词） 搜索**：这种方法通过将问题和提示词中的关键词与知识库文档数据库进行匹配来搜索文档。根据这些关键词在每个文档中的出现频率和相关性对搜索结果进行排序。
- **向量搜索 （语义搜索）**：文本通过 **嵌入模型** 被转换为 **数字向量** 。然后，它根据查询向量与文档向量之间的余弦相似度或其他相似性 / 距离度量来查找和排序文档，从而捕捉更深层次的语义含义。  
- **混合搜索**：结合多种搜索方法（例如，全文搜索 + 向量搜索）通常可以提高搜索的效果

### 8.2、RAG 的过程

RAG 过程分为 2 个不同的阶段：**索引** 和 **检索**  

**索引阶段**：在索引阶段，对知识库文档进行预处理，可实现检索阶段的高效搜索。  

索引阶段流程：加载知识库文档 ==> 将文档中的文本分段 ==> 利用向量大模型将分段后的文本转换成向量 ==> 将向量存入向量数据库  

>  为什么要进行文本分段？
>
> - 大语言模型（LLM）的上下文窗口有限，所以整个知识库可能无法全部容纳其中。
> - 你在提问中提供的信息越多，大语言模型处理并做出回应所需的时间就越长。
> - 你在提问中提供的信息越多，花费也就越多。
> - 提问中的无关信息可能会干扰大语言模型，增加产生幻觉（生成错误信息）的几率。
> - 我们可以通过将知识库分割成更小、更易于理解的片段来解决这些问题  

**检索阶段**：

检索阶段流程：通过向量模型将用户查询转换成向量 ==> 在向量数据库中根据用户查询进行相似度匹配 ==> 将用户查询和向量数据库中匹配到的相关内容一起交给 LLM 处理  

### 8.3、文档加载器

- 来自 langchain4j 模块的文件系统文档加载器（FileSystemDocumentLoader）
- 来自 langchain4j 模块的类路径文档加载器（ClassPathDocumentLoader）
- 来自 langchain4j 模块的网址文档加载器（UrlDocumentLoader）
- 来自 langchain4j-document-loader-amazon-s3 模块的亚马逊 S3 文档加载器（AmazonS3DocumentLoader）
- 来自 langchain4j-document-loader-azure-storage-blob 模块的 Azure Blob 存储文档加载器（AzureBlobStorageDocumentLoader）
- 来自 langchain4j-document-loader-github 模块的 GitHub 文档加载器（GitHubDocumentLoader）
- 来自 langchain4j-document-loader-google-cloud-storage 模块的谷歌云存储文档加载器（GoogleCloudStorageDocumentLoader）
- 来自 langchain4j-document-loader-selenium 模块的 Selenium 文档加载器（SeleniumDocumentLoader）
- 来自 langchain4j-document-loader-tencent-cos 模块的腾讯云对象存储文档加载器（TencentCosDocumentLoader）  

测试案例：

```java
@SpringBootTest
public class RAGTest {
    @Test
    public void testReadDocument() {
        //使用FileSystemDocumentLoader读取指定目录下的知识库文档
        //并使用默认的文档解析器TextDocumentParser对文档进行解析
        Document document = FileSystemDocumentLoader.loadDocument("src/code/后端开发/java/LangChain4J.md");
        System.out.println(document.text());
        
        // 加载单个文档
        Document document = FileSystemDocumentLoader.loadDocument("E:/knowledge/file.txt", new
        TextDocumentParser());
        // 从一个目录中加载所有文档
        List<Document> documents = FileSystemDocumentLoader.loadDocuments("E:/knowledge", new
        TextDocumentParser());
        // 从一个目录中加载所有的.txt文档
        PathMatcher pathMatcher = FileSystems.getDefault().getPathMatcher("glob:*.txt");
        List<Document> documents = FileSystemDocumentLoader.loadDocuments("E:/knowledge",pathMatcher, new TextDocumentParser());
        // 从一个目录及其子目录中加载所有文档
        List<Document> documents =
        FileSystemDocumentLoader.loadDocumentsRecursively("E:/knowledge", new
        TextDocumentParser());
    }
}
```

### 8.4、文档解析器

文档可以是各种格式的文件，比如 PDF、 DOC、 TXT 等等。为了解析这些不同格式的文件， 有一个 “文档解析器”（DocumentParser）接口，并且库中包含了该接口的几种实现方式：  

- 来自 langchain4j 模块的文本文档解析器（TextDocumentParser） ， 它能够解析纯文本格式的文件（例如 TXT、 HTML、 MD 等） 。
- 来自 langchain4j-document-parser-apache-pdfbox 模块的 Apache PDFBox 文档解析器（ApachePdfBoxDocumentParser），它可以解析 PDF 文件。
- 来自 langchain4j-document-parser-apache-poi 模块的 Apache POI 文档解析器（ApachePoiDocumentParser），它能够解析微软办公软件的文件格式（例如 DOC、 DOCX、 PPT、PPTX、 XLS、 XLSX 等） 。
- 来自 langchain4j-document-parser-apache-tika 模块的 Apache Tika 文档解析器（ApacheTikaDocumentParser），它可以自动检测并解析几乎所有现有的文件格式。  

如果想解析 PDF 文档，那么原有的 TextDocumentParser 就无法工作了，需要引入langchain4j-document-parser-apache-pdfbox  

```xml
<!--解析pdf文档-->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-document-parser-apache-pdfbox</artifactId>
</dependency>
```

解析 md、pdf 文档

```java
@SpringBootTest
public class testParseMD {
    @Test
    public void testReadDocument() {
        //加载并解析
        Document document = FileSystemDocumentLoader.loadDocument
                ("src/code/后端开发/java/LangChain4J.md",
                        new TextDocumentParser());
        System.out.println(document.text());
    }
}

@Test
public void testParsePDF() {
	Document document = FileSystemDocumentLoader.loadDocument("E:/xxx.pdf",
	new ApachePdfBoxDocumentParser());
    System.out.println(document);
}
```

### 8.5、文档分割器

LangChain4j 有一个 “文档分割器”（DocumentSplitter）接口，并且提供了几种开箱即用的实现方式：

- 按段落文档分割器（DocumentByParagraphSplitter）
- 按行文档分割器（DocumentByLineSplitter）
- 按句子文档分割器（DocumentBySentenceSplitter）
- 按单词文档分割器（DocumentByWordSplitter）
- 按字符文档分割器（DocumentByCharacterSplitter）
- 按正则表达式文档分割器（DocumentByRegexSplitter）
- 递归分割： DocumentSplitters.recursive (...)

默认情况下每个文本片段最多不能超过300个token  

Embedding (Vector) Stores 常见的意思是 “**嵌入（向量）存储**” 。在机器学习和自然语言处理领域，**Embedding** 指的是将数据（如文本、图像等）转换为低维稠密 **向量表示** 的过程，这些向量能够保留数据的关键特征。而 **Stores** 表示 **存储**，即用于存储这些嵌入向量的系统或工具。它们可以高效地存储和检索向量数据，支持向量相似性搜索，在文本检索、推荐系统、图像识别等任务中发挥着重要作用。 

Langchain4j支持的向量存储： https://docs.langchain4j.dev/integrations/embedding-stores/  

添加依赖：  

```xml
<!--简单的rag实现-->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-easy-rag</artifactId>
</dependency>
```

 测试：

```java
// 加载文档并存入向量数据库
@Test
public void testReadDocumentAndStore() {
    //使用 FileSystemDocumentLoader 读取指定目录下的知识库文档
    //并使用默认的文档解析器对文档进行解析(TextDocumentParser)
    Document document = FileSystemDocumentLoader.loadDocument("E:/abc.md");
    //为了简单起见， 我们暂时使用基于内存的向量存储
    InMemoryEmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
    //ingest
    //1、 分割文档：默认使用递归分割器，将文档分割为多个文本片段，每个片段包含不超过 300 个 token，并且有 30 个 token 的重叠部分保证连贯性
    //递归分割器原理：DocumentByParagraphSplitter(DocumentByLineSplitter(DocumentBySentenceSplitter(DocumentByWordSplitter)))
    //2、 文本向量化： 使用一个LangChain4j内置的轻量化向量模型对每个文本片段进行向量化
    //3、 将原始文本和向量存储到向量数据库中(InMemoryEmbeddingStore)
    EmbeddingStoreIngestor.ingest(document, embeddingStore);
    //查看向量数据库内容
    System.out.println(embeddingStore);
}
```

自定义文档分割器：

```java
/
**
* 文档分割
*/
@Test
public void testDocumentSplitter() {
    //使用FileSystemDocumentLoader读取指定目录下的知识库文档
    //并使用默认的文档解析器对文档进行解析(TextDocumentParser)
    Document document = FileSystemDocumentLoader.loadDocument("E:/abc.md");
    //为了简单起见， 我们暂时使用基于内存的向量存储
    InMemoryEmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
    //自定义文档分割器
    //按段落分割文档： 每个片段包含不超过 300个token， 并且有 30个token的重叠部分保证连贯性
    //注意： 当段落长度总和小于设定的最大长度时， 就不会有重叠的必要。
    DocumentByParagraphSplitter documentSplitter = new DocumentByParagraphSplitter(300,30,
        //token分词器： 按token计算
        new HuggingFaceTokenizer());
    
    //按字符计算
    //DocumentByParagraphSplitter documentSplitter = newDocumentByParagraphSplitter(300, 30);
    
    EmbeddingStoreIngestor
        .builder()
        .embeddingStore(embeddingStore)
        .documentSplitter(documentSplitter)
        .build()
        .ingest(document);
}
```

文档分割器工作方式：

1. 实例化一个 “文档分割器”（DocumentSplitter） ，指定所需的 “文本片段”（TextSegment）大小，并且可以选择指定 characters 或 token 的重叠部分。
2. “文档分割器”（DocumentSplitter）将给定的文档（Document）分割成更小的单元，这些单元的性质因分割器而异。例如， “按段落分割文档器”（DocumentByParagraphSplitter）将文档分割成段落（由两个或更多连续的换行符定义），而 “按句子分割文档器”（DocumentBySentenceSplitter）使用 OpenNLP 库的句子检测器将文档分割成句子，依此类推。
3. 然后， “文档分割器”（DocumentSplitter）将这些较小的单元（段落、句子、单词等）组合成 “文本片段”（TextSegment），尝试在单个 “文本片段”（TextSegment）中包含尽可能多的单元，同时不超过第一步中设置的限制。如果某些单元仍然太大，无法放入一个 “文本片段”（TextSegment）中，它会调用一个子分割器。这是另一个 “文档分割器”（DocumentSplitter），能够将不适合的单元分割成更细粒度的单元。会向每个文本片段添加一个唯一的元数据条目 “index”。第一个 “文本片段”（TextSegment）将包含 index=0 ，第二个是 index=1 ，依此类推  

**期望的文本片段最大大小：**

1. **模型上下文窗口**：如果你使用的大语言模型（LLM）有特定的上下文窗口限制，这个值不能超过模型能够处理的最大 token 数。例如，某些模型可能最大只能处理 2048 个 token，那么设置的文本片段大小就需要远小于这个值，为后续的处理（如添加指令、其他输入等）留出空间。通常，在这种情况下，你可以设置为 1000 - 1500 左右，具体根据实际情况调整。  
2. **数据特点**：如果你的文档内容较为复杂，每个段落包含的信息较多，那么可以适当提高这个值，比如设置为 500 - 800 个 token，以便在一个文本片段中包含相对完整的信息块。相反，如果文档段落较短且信息相对独立，设置为 200 - 400 个 token 可能就足够了。  
3. **检索需求**：如果希望在检索时能够更精确地匹配到相关信息，较小的文本片段可能更合适，这样可以提高信息的粒度。例如设置为 200 - 300 个 token。但如果更注重获取完整的上下文信息，较大的文本片段（如 500 - 600 个 token）可能更有助于理解相关内容。  

**重叠部分大小：**

1. **上下文连贯性**：重叠部分的主要作用是提供上下文连贯性，避免因分割导致信息缺失。如果文档内容之间的逻辑联系紧密，建议设置较大的重叠部分，如 50 - 100 个 token，以确保相邻文本片段之间的过渡自然，模型在处理时能够更好地理解上下文。
2. **数据冗余**：然而，设置过大的重叠部分会增加数据的冗余度，可能导致处理时间增加和资源浪费。因此，需要在上下文连贯性和数据冗余之间进行平衡。一般来说， 20 - 50 个 token 的重叠是比较常见的取值范围。
3. **模型处理能力**：如果使用的模型对输入的敏感性较高，较小的重叠部分（如 20 - 30 个 token）可能就足够了，因为过多的重叠可能会引入不必要的干扰信息。但如果模型对上下文依赖较大，适当增加重叠部分（如 40 - 60 个 token）可能会提高模型的性能。

例如，在处理一般性的文本资料，且使用的模型上下文窗口较大（如 4096 个 token）时，设置文本片段最大大小为 600 - 800 个 token，重叠部分为 30 - 50 个 token 可能是一个不错的选择。但最终的设置还需要通过实验和实际效果评估来确定，以找到最适合具体应用场景的参数值  

### 8.6、项目运用 RAG 流程

1. 在 Agent Config 文件中添加 ContentRetriever 类型 Bean

   ```java
   @Bean
   ContentRetriever contentRetriever() {
       //使用FileSystemDocumentLoader读取指定目录下的知识库文档
       //并使用默认的文档解析器对文档进行解析
       Document document1 = FileSystemDocumentLoader.loadDocument("E:/a.md");
       Document document2 = FileSystemDocumentLoader.loadDocument("E:/b.md");
       Document document3 = FileSystemDocumentLoader.loadDocument("E:/c.md");
       List<Document> documents = Arrays.asList(document1, document2, document3);
       //使用内存向量存储
       InMemoryEmbeddingStore<TextSegment> embeddingStore = new InMemoryEmbeddingStore<>();
       //使用默认的文档分割器
       EmbeddingStoreIngestor.ingest(documents, embeddingStore);
       //从嵌入存储（EmbeddingStore） 里检索和查询内容相关的信息
       return EmbeddingStoreContentRetriever.from(embeddingStore);	
   }
   ```

2. 在 Agent 的 @AIService 注解中添加 contentRetriever 配置 

   ```java
   @AiService(
       wiringMode = EXPLICIT,
       chatModel = "qwenChatModel",
       chatMemoryProvider = "chatMemoryProvider",
       tools = "appointmentTools",
       contentRetriever = "contentRetriever" //配置向量存储
   )
   ```

3. 修改工具的 value 提示  

   ```java
   @Tool(name="预约挂号", value = "根据参数， 先执行工具方法 queryDepartmen t查询是否可预约， 并直接给用户回答是否可预约， 并让用户确认所有预约信息， 用户确认后再进行预约。 如果用户没有提供具体的医生姓名， 请从向量存储中找到一位医生。")
   ```

## 9、向量模型与向量存储

### 9.1、向量大模型

向量模型以阿里云百炼为例：

通用文本向量模型： https://help.aliyun.com/zh/model-studio/developer-reference/text-embedding-synchronous-api?spm=a2c4g.11186623.help-menu-2400256.d_2_5_0.592672a3yMJDRq&scm=20140722.H_2712515._.OR_help-T_cn~zh-V_1  

通用文本向量 text-embedding-v3，维度1024，**维度越多，对事务的描述越精准**，信息检索的精度越高  

使用 text-embedding-v3 依然需要添加 langchain4j-community-dashscope 依赖

配置向量模型：

```properties
langchain4j.community.dashscope.embedding-model.api-key=${DASH_SCOPE_API_KEY}
langchain4j.community.dashscope.embedding-model.model-name=text-embedding-v3
```

文本向量化测试：

```java
@SpringBootTest
public class EmbeddingTest {
    @Autowired
    private EmbeddingModel embeddingModel;
    @Test
    public void testEmbeddingModel(){
        Response<Embedding> embed = embeddingModel.embed("你好");
        System.out.println("向量维度： " + embed.content().vector().length);
        System.out.println("向量输出： " + embed.toString());
    }
}
```

### 9.2、向量存储

之前使用的是 InMemoryEmbeddingStore 作为向量存储，但是不建议在生产中使用基于内存的向量存储。因此这里使用 **Pinecone** 作为向量数据库。  

官方网站： The vector database to build knowledgeable AI | Pinecone

访问官方网站、注册、登录、获取apiKey且配置在环境变量中。 默认有 2GB 的免费存储空间  

Pinecone 的得分：

- 得分的含义

  在向量检索场景中，当我们把查询文本转换为向量后，会在嵌入存储（ EmbeddingStore ）里查找与之最相似的向量（这些向量对应着文档片段等内容）。为了衡量查询向量和存储向量之间的相似程度，会使用某种相似度计算方法（例如余弦相似度等）来得出一个数值，这个数值就是得分。得分越高，表明查询向量和存储向量越相似，对应的文档片段与查询文本的相关性也就越高。  

- 得分的作用

  - 筛选结果：通过设置 minScore 阈值，能够过滤掉那些与查询文本相关性较低的结果。在代码里， minScore(0.8) 意味着只有得分大于等于 0.8 的结果才会被返回，低于这个阈值的结果会被舍弃。这样可以确保返回的结果是与查询文本高度相关的，提升检索结果的质量。
  - 控制召回率和准确率：调整 minScore 的值可以在召回率和准确率之间进行权衡。如果把阈值设置得较低，那么更多的结果会被返回，召回率会提高，但可能会包含一些相关性不太强的结果，导致准确率下降；反之，如果把阈值设置得较高，返回的结果数量会减少，准确率会提高，但可能会遗漏一些相关的结果，使得召回率降低。在实际应用中，需要根据具体的业务需求来合理设置 minScore 的值。  

集成 Pinecone ：

参考文档： Pinecone | LangChain4j  

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-pinecone</artifactId>
</dependency>
```

配置向量存储对象

```java
@Configuration
public class EmbeddingStoreConfig {
    @Autowired
    private EmbeddingModel embeddingModel;
    @Bean
    public EmbeddingStore<TextSegment> embeddingStore() {
        //创建向量存储
        EmbeddingStore<TextSegment> embeddingStore = PineconeEmbeddingStore.builder()
            .apiKey(System.getenv("PINECONE_API_KEY"))
            .index("xiaozhi-index")//如果指定的索引不存在， 将创建一个新的索引
            .nameSpace("xiaozhi-namespace") //如果指定的名称空间不存在， 将创建一个新的名称空间
            .createIndex(PineconeServerlessIndexConfig.builder()
                .cloud("AWS") //指定索引部署在 AWS 云服务上。
                .region("us-east-1") //指定索引所在的 AWS 区域为 us-east-1。
                .dimension(embeddingModel.dimension()) //指定索引的向量维度， 该维度与 embeddedModel 生成的向量维度相同。
                .build())
            .build();
        return embeddingStore;
    }
}
```

向量数据库的整合：

1. 上传知识库到Pinecone 

   ```java
   @Test
   public void testUploadKnowledgeLibrary() {
       //使用FileSystemDocumentLoader读取指定目录下的知识库文档
       //并使用默认的文档解析器对文档进行解析
       Document document1 = FileSystemDocumentLoader.loadDocument("E:/a.md");
       Document document2 = FileSystemDocumentLoader.loadDocument("E:/b.md");
       Document document3 = FileSystemDocumentLoader.loadDocument("E:/c.md");
       List<Document> documents = Arrays.asList(document1, document2, document3);
       //文本向量化并存入向量数据库： 将每个片段进行向量化， 得到一个嵌入向量
       EmbeddingStoreIngestor
       .builder()
       .embeddingStore(embeddingStore)
       .embeddingModel(embeddingModel)
       .build()
       .ingest(documents);
   }
   ```

2. 修改 AgentConfig 

   添加基于 Pinecone 的向量数据库配置  

   ```java
   @Autowired
   private EmbeddingStore embeddingStore;
   @Autowired
   private EmbeddingModel embeddingModel;
   @Bean
   ContentRetriever contentRetrieverXiaozhiPincone() {
       // 创建一个 EmbeddingStoreContentRetriever 对象， 用于从嵌入存储中检索内容
       return EmbeddingStoreContentRetriever
       .builder()
       // 设置用于生成嵌入向量的嵌入模型
       .embeddingModel(embeddingModel)
       // 指定要使用的嵌入存储
       .embeddingStore(embeddingStore)
       // 设置最大检索结果数量， 这里表示最多返回 1 条匹配结果
       .maxResults(1)
       // 设置最小得分阈值， 只有得分大于等于 0.8 的结果才会被返回
       .minScore(0.8)
       // 构建最终的 EmbeddingStoreContentRetriever 实例
       .build();
   }
   ```

3. 修改 Agent

   ```java
   @AiService(
       wiringMode = EXPLICIT,
       chatModel = "qwenChatModel",
       chatMemoryProvider = "chatMemoryProviderXiaozhi",
       tools = "appointmentTools",
       contentRetriever = "contentRetrieverXiaozhiPinone")
   ```


## 10、MCP

MCP 模型上下文协议 https://modelcontextprotocol.io/introduction

MCP是一种开放协议，它标准化了 **应用程序** 如何向 大型语言模型(**LLMs**) 提供上下文。

可以将 MCP 想象成 AI 应用的 USB-C 端口。就像 USB-C 提供了一种标准化的方式将你的设备连接到各种外围设备和配件一样，MCP提供了一种标准化的方式将 AI 模型连接到不同的数据源和工具。（大模型版 OpenFeign）

MCP 就是比 FunctionCalling 的更高一级抽像，也是实现智能体 Agent 的基础

MCP 服务网站：https://mcp.so/zh

