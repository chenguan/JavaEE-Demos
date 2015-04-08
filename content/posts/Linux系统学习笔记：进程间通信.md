Title: Linux系统学习笔记：进程间通信
Date: 2015-03-16 09:54:35
Category: Linux系统学习笔记  
Tags: Linux  
Slug: linux-file-ipc

Linux系统的进程间通信（IPC）机制包括__管道(pipe)__、__FIFO__、__消息队列__、__信号量(semaphore)__、共享存储和__套接字(socket)__，此外还有一些可选的如流等方式。管道、FIFO、消息队列、信号量和共享存储器属于经典的进程间通信机制，它们用于同一台主机的进程间通信。本篇总结这些进程间通信机制，下一篇总结使用套接字的进程间通信的方法。
*** 

[TOC]

## 管道
管道是最古老形式的IPC，它是半双工的，而且只能在有共同祖先的进程间使用。FIFO不受进程关系的限制，UNIX域套接字则同时还是全双工的。

用 pipe 函数创建管道。
```
#include <unistd.h>
/* 创建管道
 * @return      成功返回0，出错返回-1 */
int pipe(int pipefd[2]);
pipefd[0] 为读打开， pipefd[1] 为写打开， pipefd[1] 的输出是 pipefd[0] 的输入。
```
通常在调用 pipe 的进程接着调用 fork 来创建父子进程间的IPC通道。对父进程到子进程的管道，父进程关闭 pipefd[0] ，子进程关闭 pipefd[1] ，子进程到父进程的管道相反。

![](http://www.yeolar.com/media/note/2012/05/16/linux-ipc/fig1.png)
创建从父进程到子进程的管道

读一个写端被关闭的管道时，在所有数据都被读取后， read 返回0，以表明到了文件结尾。写一个读端被关闭的管道时，产生 SIGPIPE 信号，如果忽略该信号或捕捉信号并从处理程序返回， write 返回-1， errno 设为 EPIPE 。

PIPE_BUF 规定了内核中管道缓冲区的大小，写管道或FIFO时，如果有多个进程同时写，且写的字节数超过了 PIPE_BUF ，则写数据可能穿插。

例：
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include "error.h"

#define DEF_PAGER   "/bin/more"     /* default pager program */

int main(int argc, char *argv[])
{
    int     n;
    int     fd[2];
    pid_t   pid;
    char    *pager, *argv0;
    char    line[MAXLINE];
    FILE    *fp;

    if (argc != 2)
        err_quit("usage: a.out <pathname>");
    if ((fp = fopen(argv[1], "r")) == NULL)
        err_sys("can't open %s", argv[1]);
    if (pipe(fd) < 0)
        err_sys("pipe error");
    if ((pid = fork()) < 0) {
        err_sys("fork error");
    } else if (pid > 0) {                           /* parent */
        close(fd[0]);       /* close read end */
        /* parent copies argv[1] to pipe */
        while (fgets(line, MAXLINE, fp) != NULL) {
            n = strlen(line);
            if (write(fd[1], line, n) != n)
                err_sys("write error to pipe");
        }
        if (ferror(fp))
            err_sys("fgets error");
        close(fd[1]);   /* close write end of pipe for reader */
        if (waitpid(pid, NULL, 0) < 0)
            err_sys("waitpid error");
        exit(0);
    } else {                                        /* child */
        close(fd[1]);   /* close write end */
        if (fd[0] != STDIN_FILENO) {
            if (dup2(fd[0], STDIN_FILENO) != STDIN_FILENO)
                err_sys("dup2 error to stdin");
            close(fd[0]);   /* don't need this after dup2 */
        }
        /* get arguments for execl() */
        if ((pager = getenv("PAGER")) == NULL)
            pager = DEF_PAGER;
        if ((argv0 = strrchr(pager, '/')) != NULL)
            argv0++;        /* step past rightmost slash */
        else
            argv0 = pager;  /* no slash in pager */
        if (execl(pager, argv0, (char *)0) < 0)
            err_sys("execl error for %s", pager);
    }
    exit(0);
}
```
标准I/O库提供了 popen 和 pclose 函数，用来处理创建管道连接另一个进程然后交换数据这种常见情况。
```
#include <stdio.h>

/* 创建管道，调用fork产生子进程，关闭管道的不使用端，用shell执行command，然后等待执行终止
 * @return      成功返回文件指针，出错返回NULL */
FILE *popen(const char *command, const char *type);
/* 关闭标准I/O流，等待command执行结束，返回shell的终止状态
 * @return      成功返回command的终止状态，出错返回-1 */
int pclose(FILE *stream);
type 为 "r" 时，文件指针连接到 command 的标准输出； type 为 "w" 时，文件指针连接到 command 的标准输入。
```
执行 command 使用 sh -c command 的方式，因此可以执行shell扩展。

例：
```
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include "error.h"

#define PAGER   "${PAGER:-more}" /* environment variable, or default */

int main(int argc, char *argv[])
{
    char    line[MAXLINE];
    FILE    *fpin, *fpout;

    if (argc != 2)
        err_quit("usage: a.out <pathname>");
    if ((fpin = fopen(argv[1], "r")) == NULL)
        err_sys("can't open %s", argv[1]);
    if ((fpout = popen(PAGER, "w")) == NULL)
        err_sys("popen error");
    /* copy argv[1] to pager */
    while (fgets(line, MAXLINE, fpin) != NULL) {
        if (fputs(line, fpout) == EOF)
            err_sys("fputs error to pipe");
    }
    if (ferror(fpin))
        err_sys("fgets error");
    if (pclose(fpout) == -1)
        err_sys("pclose error");
    exit(0);
}
```

## 进程同步

可以用管道实现父子进程间的同步。下面是用管道解决竞争条件的版本。 p 字符经由 pfd1 由父进程发送给子进程， c 字符经由 pfd2 由子进程发送给父进程。
```
static int  pfd1[2], pfd2[2];

void TELL_WAIT(void)
{
    if (pipe(pfd1) < 0 || pipe(pfd2) < 0)
        err_sys("pipe error");
}

void TELL_PARENT(pid_t pid)
{
    if (write(pfd2[1], "c", 1) != 1)
        err_sys("write error");
}

void WAIT_PARENT(void)
{
    char    c;

    if (read(pfd1[0], &c, 1) != 1)
        err_sys("read error");
    if (c != 'p')
        err_quit("WAIT_PARENT: incorrect data");
}

void TELL_CHILD(pid_t pid)
{
    if (write(pfd1[1], "p", 1) != 1)
        err_sys("write error");
}

void WAIT_CHILD(void)
{
    char    c;

    if (read(pfd2[0], &c, 1) != 1)
        err_sys("read error");
    if (c != 'c')
        err_quit("WAIT_CHILD: incorrect data");
}
```

## 协同进程

过滤程序从标准输入读取数据，处理之后写到标准输出。一个程序产生过滤程序的输入，同时又读取它的输出时，该过滤程序即称为协同进程。协同进程有连接到另一个进程的两个单向管道。

/media/note/2012/05/16/linux-ipc/fig2.png
协同进程

例：
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include "error.h"

int main(void)
{
    int     n, int1, int2;
    char    line[MAXLINE];

    while ((n = read(STDIN_FILENO, line, MAXLINE)) > 0) {
        line[n] = 0;        /* null terminate */
        if (sscanf(line, "%d%d", &int1, &int2) == 2) {
            sprintf(line, "%d\n", int1 + int2);
            n = strlen(line);
            if (write(STDOUT_FILENO, line, n) != n)
                err_sys("write error");
        } else {
            if (write(STDOUT_FILENO, "invalid args\n", 13) != 13)
                err_sys("write error");
        }
    }
    exit(0);
}
```
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>
#include <unistd.h>
#include "error.h"

static void sig_pipe(int);      /* our signal handler */

int main(void)
{
    int     n, fd1[2], fd2[2];
    pid_t   pid;
    char    line[MAXLINE];

    if (signal(SIGPIPE, sig_pipe) == SIG_ERR)
        err_sys("signal error");
    if (pipe(fd1) < 0 || pipe(fd2) < 0)
        err_sys("pipe error");
    if ((pid = fork()) < 0) {
        err_sys("fork error");
    } else if (pid > 0) {                           /* parent */
        close(fd1[0]);
        close(fd2[1]);
        while (fgets(line, MAXLINE, stdin) != NULL) {
            n = strlen(line);
            if (write(fd1[1], line, n) != n)
                err_sys("write error to pipe");
            if ((n = read(fd2[0], line, MAXLINE)) < 0)
                err_sys("read error from pipe");
            if (n == 0) {
                err_msg("child closed pipe");
                break;
            }
            line[n] = 0;    /* null terminate */
            if (fputs(line, stdout) == EOF)
                err_sys("fputs error");
        }
        if (ferror(stdin))
            err_sys("fgets error on stdin");
        exit(0);
    } else {                                    /* child */
        close(fd1[1]);
        close(fd2[0]);
        if (fd1[0] != STDIN_FILENO) {
            if (dup2(fd1[0], STDIN_FILENO) != STDIN_FILENO)
                err_sys("dup2 error to stdin");
            close(fd1[0]);
        }
        if (fd2[1] != STDOUT_FILENO) {
            if (dup2(fd2[1], STDOUT_FILENO) != STDOUT_FILENO)
                err_sys("dup2 error to stdout");
            close(fd2[1]);
        }
        if (execl("./add2", "add2", (char *)0) < 0)
            err_sys("execl error");
    }
    exit(0);
}

static void sig_pipe(int signo)
{
    printf("SIGPIPE caught\n");
    exit(1);
}
```

## FIFO
FIFO也称为命名管道，使用它，不相关的进程也能交换数据。

创建FIFO类似于创建文件，它的路径名会存在于文件系统中。也可用 mkfifo 命令创建FIFO。
```
#include <sys/types.h>
#include <sys/stat.h>

/* 创建FIFO
 * @return      成功返回0，出错返回-1 */
int mkfifo(const char *pathname, mode_t mode);
mode 参数和 open 函数中的相同。
```
open 、 close 、 read 、 write 、 unlink 等文件I/O函数都可用于FIFO。

打开FIFO时，如果没有指定 O_NONBLOCK ，只读的 open 会阻塞直到某个进程为写而打开此FIFO，只写的 open 也会阻塞直到有进程为读打开。如果指定了 O_NONBLOCK ，只读 open 会立即返回，只写 open 如果没有相应的读进程则出错返回-1， errno 设为 ENXIO 。

和管道类似，读写端被关闭的FIFO会产生一个文件结束标志，写读端被关闭的FIFO产生信号 SIGPIPE 。

FIFO可由shell命令使用来避免创建中间临时文件，也可用于C/S架构中客户进程和服务器进程间传递数据。

## XSI IPC
XSI IPC指消息队列、信号量和共享存储器，它们属于内核中的IPC结构。

内核中的IPC结构用非负整数标识符来引用，IPC标识符是累加的。标识符是IPC对象的内部名，IPC对象还有一个相关联的键作为外部名。键的类型为 key_t ，创建IPC结构时需要指定键，它会由内核变换为标识符。

客户进程和服务器进程访问同一个IPC结构主要有三种方式：

服务器进程指定 IPC_PRIVATE 来创建新的IPC结构，然后将返回的标识符通过文件或 exec 的参数（父子进程的情况）等方式告诉客户进程。
在公共头文件中定义客户进程和服务器进程都认可的键，然后服务器进程用该键来创建新的IPC结构，需要注意该键可能会已经关联了IPC结构，因此需要删除已存在的IPC结构。
用客户进程和服务器进程都认可的路径名和项目ID （0~255）来创建键，然后在方式2中使用该键。
ftok 函数由路径名和项目ID产生键。
```
#include <sys/types.h>
#include <sys/ipc.h>

/* 由路径名和项目ID产生键
 * @return      成功返回键，出错返回-1 */
key_t ftok(const char *pathname, int proj_id);
pathname 必须为现存的文件， proj_id 只被使用低8位。

msgget 、 semget 、 shmget 函数都有 key 和 flag 参数，如果 key 为 IPC_PRIVATE ，或 key 当前未与IPC结构关联且 flag 指定了 IPC_CREAT 位，则函数创建新的IPC结构。 IPC_PRIVATE 总是用于创建新IPC结构。

每个IPC结构有一个 ipc_perm 结构，它限定了权限和所有者，该结构的定义如下：

struct ipc_perm {
    __uid_t uid;                /* 所有者有效用户ID */
    __gid_t gid;                /* 所有者有效组ID */
    __uid_t cuid;               /* 创建者有效用户ID */
    __gid_t cgid;               /* 创建者有效组ID */
    unsigned short int mode;    /* 访问权限 */
    /* ... */
};
```
IPC结构创建时， ipc_perm 结构中的字段会被设初值，可以用 msgctl 、 semctl 、 shmctl 来修改 uid 、 gid 和 mode 字段，但进程必须是超级用户或IPC结构的创建者。

XSI IPC的权限位有：

权限	位	权限	位	权限	位
用户读	0400	组读	0040	其他读	0004
用户写（更改）	0200	组写（更改）	0020	其他写（更改）	0002
其中信号量不称为写而是更改。

用 ipcs -l 可以查看三种IPC的限制。

### 消息队列

消息队列是消息的链接表，存放在内核中并由消息队列ID标识。

每个消息队列都有一个关联的 msqid_ds 结构，它记录了消息队列的当前状态，该结构的定义如下：
```
struct msqid_ds {
    struct ipc_perm msg_perm;
    time_t          msg_stime;    /* 上次msgsnd的时间 */
    time_t          msg_rtime;    /* 上次msgrcv的时间 */
    time_t          msg_ctime;    /* 上次修改的时间 */
    unsigned long   __msg_cbytes; /* 队列中当前字节数 */
    msgqnum_t       msg_qnum;     /* 队列中当前消息数 */
    msglen_t        msg_qbytes;   /* 队列的最大字节数 */
    pid_t           msg_lspid;    /* 上次msgsnd的进程ID */
    pid_t           msg_lrpid;    /* 上次msgrcv的进程ID */
};
```
msgget 函数创建新消息队列或打开现存的消息队列。创建新队列时， msgflg 指定 msg_perm.mode 的权限位设置。
```
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>

/* 创建新消息队列或打开现存的消息队列
 * @return      成功返回消息队列ID，出错返回-1 */
int msgget(key_t key, int msgflg);
msgctl 函数执行对消息队列的操作。
```
```
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>

/* 执行对消息队列的操作
 * @return      成功返回0，出错返回-1 */
int msgctl(int msqid, int cmd, struct msqid_ds *buf);
cmd 参数指定要执行的命令，有：

IPC_STAT ：获取消息队列的 msqid_ds 结构，保存在 buf 中。
IPC_SET ：根据 buf 指向结构的值，设置 msg_perm.uid 、 msg_perm.gid 、 msg_perm.mode 、 msg_qbytes 。进程必须是超级用户进程或有效用户ID等于 msg_perm.cuid 或 msg_perm.uid ，增加 msg_qbytes 的值则必须是超级用户。
IPC_RMID ：从系统中删除消息队列和其中的所有数据，删除会立即生效。进程必须是超级用户进程或有效用户ID等于 msg_perm.cuid 或 msg_perm.uid 。
msgsnd 函数将消息放到消息队列中， msgrcv 函数从消息队列中取消息。消息总是添加在队列末尾。函数成功返回时，内核会更新和消息队列关联的 msqid_ds 结构。
```
```
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/msg.h>

/* 将消息放到消息队列中
 * @return      成功返回0，出错返回-1 */
int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg);
/* 从消息队列中取消息
 * @return      成功返回消息的数据部分的长度，出错返回-1 */
ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp, int msgflg);
msgp 指向一个长整型数，它包含正整数的消息类型，在后面是消息数据， msgsz 给出消息数据的长度，它可以为0。若发送1字节数据的消息，可以定义消息的结构为：

struct msgbuf {
    long mtype;     /* 消息类型，>0 */
    char mtext[1];  /* 消息数据 */
};
可以用消息类型来以非先进先出的次序取消息。
```
msgtyp 可以指定需要的消息：

= 0 时，返回消息队列中的第一个消息。
> 0 时，返回消息队列中消息类型为 msgtyp 的第一个消息。
< 0 时，返回消息队列中消息类型小于等于 msgtyp 绝对值的消息，取其中类型值最小者。
对 msgsnd ， msgflg 指定为 IPC_NOWAIT 时，若消息队列已满，立即出错返回；若没有指定，则进程阻塞，直到有空间、消息队列被删除或捕捉到信号为止。对 msgrcv ， msgflg 指定为 IPC_NOWAIT 时，若没有指定的消息，立即出错返回；若没有指定，同样阻塞进程。

msgflg 设置 MSG_NOERROR 时，若 msgrcv 返回的消息大于 msgsz ，则自动截短；若没设置而消息过长时，会出错返回，消息留在消息队列中。

信号量

信号量是一个计数器，用于多进程对共享数据对象的访问。进程获取共享资源时，测试控制该资源的信号量。若信号量的值为正，则进程可以使用资源，进程将信号量的值减1；若信号量的值为0，则进程休眠直到信号量的值大于0。进程不再使用资源时，信号量的值加1，如果有休眠等待的进程，则唤醒它们，进程被唤醒后，重新测试。

信号量集是一个或多个信号量的集合，内核为每个信号量集设置了一个 semid_ds 结构，它的定义如下：
```
struct semid_ds {
    struct ipc_perm sem_perm;
    time_t          sem_otime; /* 上次semop的时间 */
    time_t          sem_ctime; /* 上次修改的时间 */
    unsigned short  sem_nsems; /* 信号量数量 */
};
```
每个信号量是一个无名结构，包含下列成员：

unsigned short  semval;   /* 信号量的值，>=0 */
unsigned short  semzcnt;  /* 等待信号量的值为0的进程 */
unsigned short  semncnt;  /* 等待信号量的值增加的进程 */
pid_t           sempid;   /* 上次操作的进程ID */
semget 函数创建新信号量集或引用现存的信号量集。创建新信号量集时， nsems 指定 sem_nsems ， semflg 指定 sem_perm.mode 的权限位设置。引用现存的信号量集时， nsems 设为0。
```
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>

/* 创建新信号量集或引用现存的信号量集
 * @return      成功返回信号量集ID，出错返回-1 */
int semget(key_t key, int nsems, int semflg);
semctl 函数执行对信号量的操作。

#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>

/* 执行对信号量的操作 */
int semctl(int semid, int semnum, int cmd, ... /* union semun arg */);
第四个参数是可选的，它的类型为联合 semun ，该联合的定义如下：

union semun {
    int             val;    /* 用于SETVAL的值 */
    struct semid_ds *buf;   /* 用于IPC_STAT, IPC_SET的缓冲 */
    unsigned short  *array; /* 用于GETALL, SETALL的数组 */
    struct seminfo  *__buf; /* 用于IPC_INFO的缓冲 */
};
```
cmd 参数可以指定的命令有：

IPC_STAT ：取信号量集的 semid_ds 结构，存放在 arg.buf 指向的结构中。
IPC_SET ：根据 arg.buf 指向的结构中的值设置信号量集 semid_ds 结构中的 sem_perm.uid 、 sem_perm.gid 、 sem_perm.mode 。进程必须是超级用户进程或有效用户ID等于 sem_perm.cuid 或 sem_perm.uid 。
IPC_RMID ：从系统中删除信号量集，删除会立即生效。进程必须是超级用户进程或有效用户ID等于 sem_perm.cuid 或 sem_perm.uid 。
GETVAL ：获取 semnum 指定的信号的 semval 值。
SETVAL ：根据 arg.val 设置 semnum 指定的信号的 semval 值。
GETZCNT ：获取 semnum 指定的信号的 semzcnt 值。
GETNCNT ：获取 semnum 指定的信号的 semncnt 值。
GETPID ：获取 semnum 指定的信号的 sempid 值。
GETALL ：获取信号量集中所有信号量的值，存放在 arg.array 指向的数组中。
SETALL ：根据 arg.array 指向的数组中的值设置信号量集中所有信号量的值。
针对特定信号量时，用 semnum 指定信号量，它取0到 nsems-1 之间的值。

除 GETALL 之外的 GET 命令，函数返回结果，其他命令函数返回0，出错时返回-1。

semop 自动执行信号量集上的操作数组。
```
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>

/* 执行信号量集上的操作数组
 * @return      成功返回0，出错返回-1 */
int semop(int semid, struct sembuf *sops, unsigned nsops);
int semtimedop(int semid, struct sembuf *sops, unsigned nsops,
               struct timespec *timeout);
sops 参数指向信号量操作数组，信号量操作由 sembuf 结构表示：

struct sembuf {
    unsigned short sem_num; /* semnum */
    short    sem_op;        /* 操作 */
    short    sem_flg;       /* 操作选项 */
};
```
nsops 参数指定数组的元素数。

sem_op 有三种取值：

> 0 时，表示释放该信号量控制的资源。信号量的值加上 sem_op ，若 sem_flg 指定了 SEM_UNDO ，则同时信号量的调整值减去 sem_op 。
< 0 时，表示获取该信号量控制的资源。若信号量的值大于等于 sem_op 的绝对值，即具有所需的资源：信号量的值减去 sem_op 的绝对值，若 sem_flg 指定了 SEM_UNDO ，则同时信号量的调整值加上 sem_op 的绝对值。若信号量的值小于 sem_op 的绝对值，即资源不能满足需求：
若 sem_flg 指定了 IPC_NOWAIT ，则函数出错返回。
若没指定 IPC_NOWAIT ，信号量的 semncnt 值加1，挂起进程直到：
信号量大于等于 sem_op 的绝对值，即有进程释放了一些资源，然后 semncnt 减1，并如获取资源时那样减小信号量的值等等。
从系统中删除了信号量，这时函数出错返回。
进程捕捉到信号，这时信号量的 semncnt 减1，函数出错返回。
= 0 时，表示进程希望等待到信号量的值变为0。若信号量的值为0，函数立即返回。若信号量的值非0，和2中信号量的值小于 sem_op 的绝对值时的情况类似，区别是信号量和0比较。
进程终止时，如果它占用了信号量分配的资源，信号量不会调整，这会造成麻烦。信号量操作指定 SEM_UNDO 标志时，进程终止时内核会进行检查并根据调整值进行处理。

用 SETVAL 或 SETALL 命令的 semctl 函数设置信号量的值时，该信号量的调整值会被设为0，这对所有进程有效。

共享存储

共享存储允许两个或更多进程共享给定的存储区，它是最快的一种IPC。使用共享存储时要处理多个进程间的同步，这可以使用信号量或记录锁。共享存储可由不相关的进程使用，如果进程是相关的，也可以使用 mmap 来处理。

在地址空间中，共享存储紧靠在栈之下。

内核为每个共享存储段设置了一个 shmid_ds 结构，它的定义如下：

struct shmid_ds {
    struct ipc_perm shm_perm;
    size_t          shm_segsz;   /* 段字节数 */
    time_t          shm_atime;   /* 上次连接时间 */
    time_t          shm_dtime;   /* 上次脱接时间 */
    time_t          shm_ctime;   /* 上次修改时间 */
    pid_t           shm_cpid;    /* 创建者进程ID */
    pid_t           shm_lpid;    /* 上次shmat/shmdt的进程ID */
    shmatt_t        shm_nattch;  /* 当前连接者数目 */
    /* ... */
};
shmget 函数创建新共享存储段或引用现存的共享存储段。创建新共享存储段时， size 指定 shm_segsz ， shmflg 指定 shm_perm.mode 的权限位设置。引用现存的共享存储段时， size 设为0。创建新段时，段的内容会初始化为0。
```
#include <sys/ipc.h>
#include <sys/shm.h>

/* 创建新共享存储段或引用现存的共享存储段
 * @return      成功返回共享存储ID，出错返回-1 */
int shmget(key_t key, size_t size, int shmflg);
shmctl 函数执行对共享存储段的操作。
```
```
#include <sys/ipc.h>
#include <sys/shm.h>

/* 执行对共享存储段的操作
 * @return      成功返回0，出错返回-1 */
int shmctl(int shmid, int cmd, struct shmid_ds *buf);
cmd 参数可以指定为：

IPC_STAT ：获取共享存储段的 shmid_ds 结构，保存在 buf 中。
IPC_SET ：根据 buf 指向结构的值，设置 shm_perm.uid 、 shm_perm.gid 、 shm_perm.mode 。进程必须是超级用户进程或有效用户ID等于 shm_perm.cuid 或 shm_perm.uid 。
IPC_RMID ：从系统中删除共享存储段，此时不能再连接该段，但直到使用该段的最后一个进程终止或和该段脱接时才会实际删除该段。进程必须是超级用户进程或有效用户ID等于 shm_perm.cuid 或 shm_perm.uid 。
SHM_LOCK ：将共享存储段锁定在内存中，只能由超级用户执行。
SHM_UNLOCK ：将共享存储段解锁，只能由超级用户执行。
进程可以用 shmat 函数将共享存储段连接到它的地址空间中，用 shmdt 函数脱接共享存储段。执行成功时 shm_nattch 会相应地加减1。
```
```
#include <sys/types.h>
#include <sys/shm.h>

/* 将共享存储段连接到进程的地址空间中
 * @return      成功返回指向共享存储的指针，出错返回-1 */
void *shmat(int shmid, const void *shmaddr, int shmflg);
/* 脱接共享存储段
 * @return      成功返回0，出错返回-1 */
int shmdt(const void *shmaddr);
```
若 shmaddr 为0，则共享存储段连接到内核选择的第一个地址上。若 shmaddr 非0，且 shmflg 没有指定 SHM_RND ，则共享存储段连接到 shmaddr 指定的地址上；若 shmflg 指定了 SHM_RND ，则将 shmaddr 向下取整（ SHMLBA 的倍数）。一般将 shmaddr 设为0。

shmflg 中指定了 SHM_RDONLY 位时以只读方式连接共享存储段，否则以读写方式连接。

脱接共享存储段时并不删除共享存储段，删除它需要使用 IPC_RMID 命令的 shmctl 函数。

## XSI IPC的一些问题

消息队列、信号量和共享存储实现在内核中，通常它们的效率较高。

此外，把消息队列和其他的IPC进行比较：

IPC类型	无连接	可靠	流控制	记录	消息类型或优先级
消息队列	否	是	是	是	是
STREAMS	否	是	是	是	是
FIFO	否	是	是	否	否
UNIX域流套接字	否	是	是	否	否
UNIX域数据报套接字	是	是	否	是	否
无连接指不需要某种创建就能发送消息；流控制指不能接收更多消息时发送进程休眠。

XSI IPC的缺点是这些IPC结构在系统范围内生效，没有访问计数，创建它的进程终止时，IPC结构会遗留在系统中，直到用 xxxctl 函数显式地删除（或者是执行 ipcrm 命令、重启系统）。

另一个缺点是它们不具有文件系统中的名字，所以不能使用 select 和 poll 等函数同时处理多个IPC结构。

一般建议用全双工管道和记录锁代替使用消息队列和信号量，可以考虑用 mmap 函数代替共享存储，它们的使用要更为简单。